const BaseModel = require('./baseModel');

const defaultHeaderSettings = {
  menu: {
    items: [
      { id: 'hero', label: 'Trang Chủ', link: '#hero', enabled: true },
      { id: 'about', label: 'Giới Thiệu', link: '#about', enabled: true },
      { id: 'services', label: 'Dịch Vụ', link: '#services', enabled: true },
      { id: 'portfolio', label: 'Dự Án', link: '#portfolio', enabled: true },
      { id: 'team', label: 'Đội Ngũ', link: '#team', enabled: true },
    ]
  },
  cta: {
    label: 'Liên Hệ',
    link: '#contact',
    visible: true
  },
  logo: {
    url: '',
    scrolledUrl: '',
    width: 120,
    height: 40
  },
  background: {
    initial: {
      type: 'solid',
      color: '#0b1220',
      opacity: 1,
      blur: 0,
      gradientFrom: '#000000',
      gradientTo: '#ffffff',
      gradientAngle: 90,
      shadow: false
    },
    scrolled: {
      type: 'solid',
      color: '#ffffff',
      opacity: 1,
      blur: 0,
      gradientFrom: '#ffffff',
      gradientTo: '#000000',
      gradientAngle: 90,
      shadow: false
    }
  },
  text: {
    defaultColor: '#ffffff'
  }
};

class HeaderModel extends BaseModel {
  constructor() {
    super('header-settings.json', defaultHeaderSettings);
  }

  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings,
      menu: settings.menu || this.defaultSettings.menu,
      cta: { ...this.defaultSettings.cta, ...settings.cta },
      logo: { ...this.defaultSettings.logo, ...settings.logo },
      background: {
        initial: { ...this.defaultSettings.background.initial, ...settings.background?.initial },
        scrolled: { ...this.defaultSettings.background.scrolled, ...settings.background?.scrolled }
      },
      text: { ...this.defaultSettings.text, ...settings.text }
    };
  }
}

module.exports = new HeaderModel();

