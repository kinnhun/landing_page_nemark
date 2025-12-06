const config = require('../config');
const FileStorage = require('../utils/fileStorage');

const storage = new FileStorage(config.dataDir);

class SettingsModel {
  constructor() {
    this.headerFileName = 'header-settings.json';
    this.bannerFileName = 'banner-settings.json';
    this.aboutFileName = 'about-settings.json';
    
    this.defaultHeaderSettings = {
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

    this.defaultBannerSettings = {
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

    this.defaultAboutSettings = {
      title: 'Giới Thiệu Về Nemark',
      description: 'Nemark là đơn vị cung cấp giải pháp số toàn diện cho doanh nghiệp, bao gồm: thiết kế website, phát triển phần mềm theo yêu cầu, AI automation và hệ thống hosting/vps chuyên nghiệp. Chúng tôi mang đến những sản phẩm hiện đại, tối ưu trải nghiệm người dùng và hỗ trợ doanh nghiệp chuyển đổi số hiệu quả.',
      image: '/assets/img/about.jpg',
      videoUrl: 'https://www.youtube.com/embed/z2EYAGlwBB0?autoplay=1',
      features: [
        {
          icon: 'DeploymentUnitOutlined',
          title: 'Thiết Kế Website & Giải Pháp Thương Hiệu',
          description: 'Website chuẩn SEO, giao diện hiện đại, tốc độ cao và tối ưu chuyển đổi — phù hợp mọi ngành nghề và mô hình kinh doanh.'
        },
        {
          icon: 'CodeOutlined',
          title: 'Phần Mềm, Ứng Dụng & Tự Động Hóa',
          description: 'Phát triển phần mềm theo yêu cầu (CRM, ERP, quản lý bán hàng), tích hợp AI và tự động hóa quy trình giúp doanh nghiệp nâng cao hiệu suất.'
        },
        {
          icon: 'CloudServerOutlined',
          title: 'Hạ Tầng Hosting – Server – Bảo Mật',
          description: 'Cung cấp hosting/VPS tốc độ cao, ổn định, bảo mật mạnh mẽ, backup mỗi ngày và hỗ trợ kỹ thuật 24/7 nhằm đảm bảo hệ thống vận hành liên tục.'
        }
      ]
    };
  }

  /**
   * Get header settings
   */
  async getHeaderSettings() {
    const settings = await storage.read(this.headerFileName);
    if (!settings) return this.defaultHeaderSettings;
    
    // Merge with defaults to ensure all fields exist
    return {
      ...this.defaultHeaderSettings,
      ...settings,
      menu: settings.menu || this.defaultHeaderSettings.menu,
      cta: { ...this.defaultHeaderSettings.cta, ...settings.cta },
      logo: { ...this.defaultHeaderSettings.logo, ...settings.logo },
      background: {
        initial: { ...this.defaultHeaderSettings.background.initial, ...settings.background?.initial },
        scrolled: { ...this.defaultHeaderSettings.background.scrolled, ...settings.background?.scrolled }
      },
      text: { ...this.defaultHeaderSettings.text, ...settings.text }
    };
  }

  /**
   * Update header settings
   */
  async updateHeaderSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.headerFileName, toSave);
  }

  /**
   * Reset to default header settings
   */
  async resetHeaderSettings() {
    return await storage.write(this.headerFileName, this.defaultHeaderSettings);
  }

  /**
   * Get banner settings
   */
  async getBannerSettings() {
    const settings = await storage.read(this.bannerFileName);
    if (!settings) return this.defaultBannerSettings;

    return {
      ...this.defaultBannerSettings,
      ...settings,
      overlay: { ...this.defaultBannerSettings.overlay, ...settings.overlay },
      cta: { ...this.defaultBannerSettings.cta, ...settings.cta }
    };
  }

  /**
   * Update banner settings
   */
  async updateBannerSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.bannerFileName, toSave);
  }

  /**
   * Reset to default banner settings
   */
  async resetBannerSettings() {
    return await storage.write(this.bannerFileName, this.defaultBannerSettings);
  }

  /**
   * Get about settings
   */
  async getAboutSettings() {
    const settings = await storage.read(this.aboutFileName);
    if (!settings) return this.defaultAboutSettings;
    
    return {
      ...this.defaultAboutSettings,
      ...settings,
      features: settings.features || this.defaultAboutSettings.features
    };
  }

  /**
   * Update about settings
   */
  async updateAboutSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.aboutFileName, toSave);
  }

  /**
   * Reset about settings
   */
  async resetAboutSettings() {
    return await storage.write(this.aboutFileName, this.defaultAboutSettings);
  }
}

module.exports = new SettingsModel();
