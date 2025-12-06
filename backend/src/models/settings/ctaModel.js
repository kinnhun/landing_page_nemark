const BaseModel = require('./baseModel');

const defaultCtaSettings = {
  title: 'Đồng Hành Cùng Nemark Trong Hành Trình Chuyển Đổi Số',
  description: 'Bạn đang cần một website chuyên nghiệp, phần mềm quản lý linh hoạt hay giải pháp AI tự động hóa quy trình? Nemark sẵn sàng hỗ trợ và xây dựng giải pháp phù hợp nhất cho doanh nghiệp của bạn.',
  backgroundImage: '/assets/img/cta-bg.jpg',
  background: {
    type: 'gradient',
    gradientFrom: '#2563eb', // blue-600
    gradientTo: '#14b8a6',   // teal-500
    opacity: 1
  },
  overlay: {
    enabled: true,
    opacity: 0.1
  },
  button: {
    label: 'Liên Hệ Ngay',
    link: '#contact',
    visible: true,
    backgroundColor: '#ffffff',
    textColor: '#2563eb',
    hoverBackgroundColor: '#f3f4f6',
    hoverTextColor: '#2563eb'
  }
};

class CtaModel extends BaseModel {
  constructor() {
    super('cta-settings.json', defaultCtaSettings);
  }

  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings,
      background: { ...this.defaultSettings.background, ...settings.background },
      overlay: { ...this.defaultSettings.overlay, ...settings.overlay },
      button: { ...this.defaultSettings.button, ...settings.button }
    };
  }
}

module.exports = new CtaModel();

