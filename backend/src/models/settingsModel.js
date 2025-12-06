const config = require('../config');
const FileStorage = require('../utils/fileStorage');

const storage = new FileStorage(config.dataDir);

class SettingsModel {
  constructor() {
    this.fileName = 'header-settings.json';
    this.defaultSettings = {
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
  }

  /**
   * Get header settings
   */
  async getHeaderSettings() {
    const settings = await storage.read(this.fileName);
    return settings || this.defaultSettings;
  }

  /**
   * Update header settings
   */
  async updateHeaderSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.fileName, toSave);
  }

  /**
   * Reset to default settings
   */
  async resetHeaderSettings() {
    return await storage.write(this.fileName, this.defaultSettings);
  }
}

module.exports = new SettingsModel();
