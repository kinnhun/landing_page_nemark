import type { ContactSettings } from '../types/contact';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_URL = API_BASE_URL ? `${API_BASE_URL}/api` : '/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getContactSettings = async (): Promise<ContactSettings> => {
  try {
    const res = await fetch(`${API_URL}/settings/contact`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) throw new Error('Failed to fetch');
    const json = (await res.json()) as ApiResponse<ContactSettings>;
    return json.data;
  } catch (err) {
    console.warn('contactApi.getContactSettings: failed to fetch from backend, using default contact', err);
    return {
      title: 'Liên Hệ',
      description: 'Kết nối với Nemark để được tư vấn giải pháp thiết kế website, phần mềm và chuyển đổi số phù hợp nhất với doanh nghiệp của bạn.',
      contactInfo: [
        {
          id: 1,
          type: 'address',
          label: 'Địa Chỉ',
          value: 'Hà Nội, Việt Nam',
          enabled: true
        },
        {
          id: 2,
          type: 'phone',
          label: 'Hotline',
          value: '0123456789',
          link: 'tel:0123456789',
          enabled: true
        },
        {
          id: 3,
          type: 'email',
          label: 'Email',
          value: 'contact@nemark.vn',
          link: 'mailto:contact@nemark.vn',
          enabled: true
        }
      ],
      formFields: [
        {
          id: 1,
          name: 'name',
          label: 'Họ và tên',
          type: 'text',
          placeholder: 'Họ và tên',
          required: true,
          enabled: true,
          validation: {
            minLength: 2,
            maxLength: 100
          }
        },
        {
          id: 2,
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
          required: true,
          enabled: true,
          validation: {
            maxLength: 200
          }
        },
        {
          id: 3,
          name: 'subject',
          label: 'Tiêu đề',
          type: 'text',
          placeholder: 'Tiêu đề',
          required: true,
          enabled: true,
          validation: {
            minLength: 3,
            maxLength: 200
          }
        },
        {
          id: 4,
          name: 'message',
          label: 'Nội dung liên hệ',
          type: 'textarea',
          placeholder: 'Nội dung liên hệ',
          required: true,
          enabled: true,
          validation: {
            minLength: 10,
            maxLength: 2000
          }
        }
      ],
      formAction: '#',
      formMethod: 'post',
      submitButtonText: 'Gửi Tin Nhắn',
      visible: true,
      showContactInfo: true,
      showForm: true,
      contactInfoColumns: 1,
      enableAnimation: true
    } as ContactSettings;
  }
};

export const saveContactSettings = async (settings: ContactSettings): Promise<ContactSettings | null> => {
  try {
    const res = await fetch(`${API_URL}/settings/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, errorText);
      return null;
    }
    const json = (await res.json()) as ApiResponse<ContactSettings>;
    return json.data;
  } catch (err) {
    console.error('Error saving contact settings:', err);
    return null;
  }
};

