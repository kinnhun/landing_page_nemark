const BaseModel = require('./baseModel');

const defaultContactSettings = {
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
  googleSheetUrl: '',
  googleSheetTabName: 'Sheet1',
  submitButtonText: 'Gửi Tin Nhắn',
  visible: true,
  showContactInfo: true,
  showForm: true,
  contactInfoColumns: 1,
  enableAnimation: true
};

class ContactModel extends BaseModel {
  constructor() {
    super('contact-settings.json', defaultContactSettings);
  }

  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings,
      contactInfo: settings.contactInfo || this.defaultSettings.contactInfo,
      formFields: settings.formFields || this.defaultSettings.formFields
    };
  }
}

module.exports = new ContactModel();

