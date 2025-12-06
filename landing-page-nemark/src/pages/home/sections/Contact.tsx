import React, { useState, useEffect, useCallback } from "react";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { getContactSettings } from '@/services/contactApi';
import type { ContactSettings, ContactInfo, ContactFormField } from '@/types/contact';
import { message } from 'antd';

const Contact = () => {
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchContactData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getContactSettings();
      setSettings(data);
    } catch (err) {
      console.error('Error fetching contact settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContactData();

    // Listen for contact settings updates
    const handleUpdate = () => {
      fetchContactData();
    };

    // Listen to localStorage event
    window.addEventListener('contact_settings_updated', handleUpdate);

    // Listen to BroadcastChannel
    const channel = new BroadcastChannel('app_settings_channel');
    channel.addEventListener('message', (event) => {
      if (event.data === 'contact-updated') {
        fetchContactData();
      }
    });

    return () => {
      window.removeEventListener('contact_settings_updated', handleUpdate);
      channel.close();
    };
  }, [fetchContactData]);

  // Don't render if hidden or loading
  if (loading) {
    return (
      <section id="contact" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-500">Đang tải...</div>
        </div>
      </section>
    );
  }

  if (!settings || settings.visible === false) {
    return null;
  }

  const contactInfo = (settings.contactInfo || []).filter(info => info.enabled !== false);
  const formFields = (settings.formFields || []).filter(field => field.enabled !== false);

  // Handle form submission to Google Sheet
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!settings?.googleSheetUrl) {
      message.error('Chưa cấu hình Google Sheet URL');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};
      
      // Collect form data
      formFields.forEach((field) => {
        const value = formData.get(field.name) as string;
        if (value) {
          data[field.label] = value;
        }
      });

      // Extract Google Sheet ID from URL
      // Format: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
      const sheetUrl = settings.googleSheetUrl;
      const sheetIdMatch = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      
      if (!sheetIdMatch) {
        message.error('Google Sheet URL không hợp lệ');
        setSubmitting(false);
        return;
      }

      const sheetId = sheetIdMatch[1];
      const tabName = settings.googleSheetTabName || 'Sheet1';

      // Send data to backend API to save to Google Sheet
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sheetId,
          tabName,
          data,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        message.success(result.message || 'Gửi tin nhắn thành công!');
        (e.target as HTMLFormElement).reset();
      } else {
        // Show error message
        let errorMsg = result.message || 'Có lỗi xảy ra khi gửi tin nhắn';
        
        // If there are instructions, show them in console and a more detailed message
        if (result.instructions && Array.isArray(result.instructions)) {
          console.error('Hướng dẫn cấu hình Google Sheets:', result.instructions);
          errorMsg += '\n\nVui lòng kiểm tra console để xem hướng dẫn chi tiết.';
        }
        
        message.error(errorMsg);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      message.error('Có lỗi xảy ra khi gửi tin nhắn');
    } finally {
      setSubmitting(false);
    }
  };

  // Get icon for contact info type
  const getIconForType = (type: string) => {
    switch (type) {
      case 'address':
        return <EnvironmentOutlined />;
      case 'phone':
        return <PhoneOutlined />;
      case 'email':
        return <MailOutlined />;
      default:
        return <EnvironmentOutlined />;
    }
  };

  // Get grid columns class for contact info
  const getContactInfoGridCols = () => {
    const cols = settings.contactInfoColumns || 1;
    if (cols === 1) return 'grid-cols-1';
    if (cols === 2) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-3'; // 3 columns
  };

  // Render form field based on type
  const renderFormField = (field: ContactFormField) => {
    const commonProps = {
      name: field.name,
      placeholder: field.placeholder || '',
      required: field.required !== false,
      className: "w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors",
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={6}
            maxLength={field.validation?.maxLength}
            minLength={field.validation?.minLength}
          />
        );
      case 'email':
        return (
          <input
            type="email"
            {...commonProps}
            maxLength={field.validation?.maxLength}
            minLength={field.validation?.minLength}
          />
        );
      case 'tel':
        return (
          <input
            type="tel"
            {...commonProps}
            maxLength={field.validation?.maxLength}
            minLength={field.validation?.minLength}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            {...commonProps}
            max={field.validation?.maxLength}
            min={field.validation?.minLength}
          />
        );
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">{field.placeholder || 'Chọn...'}</option>
            {(field.options || []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            {...commonProps}
            maxLength={field.validation?.maxLength}
            minLength={field.validation?.minLength}
          />
        );
    }
  };

  // Group form fields into rows (2 columns for text/email/tel, full width for textarea)
  const getFormFieldLayout = (field: ContactFormField): 'full' | 'half' => {
    return field.type === 'textarea' ? 'full' : 'half';
  };

  const halfWidthFields: ContactFormField[] = [];
  const fullWidthFields: ContactFormField[] = [];

  formFields.forEach(field => {
    if (getFormFieldLayout(field) === 'half') {
      halfWidthFields.push(field);
    } else {
      fullWidthFields.push(field);
    }
  });

  return (
    <section id="contact" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 text-center mb-12 flex flex-col items-center">
        <Reveal direction="up">
          <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">{settings.title || 'Liên Hệ'}</h2>
          {settings.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {settings.description}
            </p>
          )}
        </Reveal>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* THÔNG TIN LIÊN HỆ */}
          {settings.showContactInfo !== false && contactInfo.length > 0 && (
            <div className={settings.showForm !== false && formFields.length > 0 ? "lg:w-1/3" : "lg:w-full"}>
              <StaggerContainer className={`grid ${getContactInfoGridCols()} gap-6`}>
                {contactInfo.map((info: ContactInfo) => (
                  <StaggerItem key={info.id}>
                    <div className="flex items-start p-6 bg-white shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-teal-500 text-white rounded-full flex items-center justify-center text-xl mr-4 shrink-0">
                        {getIconForType(info.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{info.label}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 text-sm hover:text-blue-500 transition-colors"
                            target={info.link.startsWith('#') || info.link.startsWith('tel:') || info.link.startsWith('mailto:') ? undefined : '_blank'}
                            rel={info.link.startsWith('#') || info.link.startsWith('tel:') || info.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600 text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          {/* FORM LIÊN HỆ */}
          {settings.showForm !== false && formFields.length > 0 && (
            <div className={settings.showContactInfo !== false && contactInfo.length > 0 ? "lg:w-2/3" : "lg:w-full"}>
              <Reveal width="100%" delay={0.4}>
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-white p-8 shadow-sm rounded-lg border border-gray-100"
                >
                  {/* Half-width fields in grid */}
                  {halfWidthFields.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {halfWidthFields.map((field) => (
                        <div key={field.id}>
                          {renderFormField(field)}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Full-width fields */}
                  {fullWidthFields.map((field) => (
                    <div key={field.id} className="mb-4">
                      {renderFormField(field)}
                    </div>
                  ))}

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Đang gửi...' : (settings.submitButtonText || 'Gửi Tin Nhắn')}
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
