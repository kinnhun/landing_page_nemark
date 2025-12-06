const BaseModel = require('./baseModel');

const defaultBannerSettings = {
  title: 'Giải Pháp Số Toàn Diện Cho Doanh Nghiệp',
  description: 'Nemark cung cấp dịch vụ thiết kế website, phát triển phần mềm, AI automation và hệ thống hosting/vps giúp doanh nghiệp tối ưu vận hành & tăng trưởng doanh số.',
  backgroundImage: '/assets/img/hero-bg.jpg',
  overlay: {
    enabled: true,
    fromColor: '#1e3a8a', // blue-900
    toColor: '#115e59',   // teal-800
    opacity: 0.85
  },
  cta: {
    label: 'Khám Phá Ngay',
    link: '#about',
    visible: true
  }
};

class BannerModel extends BaseModel {
  constructor() {
    super('banner-settings.json', defaultBannerSettings);
  }

  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings,
      overlay: { ...this.defaultSettings.overlay, ...settings.overlay },
      cta: { ...this.defaultSettings.cta, ...settings.cta }
    };
  }
}

module.exports = new BannerModel();

