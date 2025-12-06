const config = require('../config');
const FileStorage = require('../utils/fileStorage');

const storage = new FileStorage(config.dataDir);

class SettingsModel {
  constructor() {
    this.headerFileName = 'header-settings.json';
    this.bannerFileName = 'banner-settings.json';
    this.aboutFileName = 'about-settings.json';
    this.statsFileName = 'stats-settings.json';
    this.servicesFileName = 'services-settings.json';
    this.ctaFileName = 'cta-settings.json';
    this.portfolioFileName = 'portfolio-settings.json';
    
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

    this.defaultStatsSettings = {
      stats: [
        { label: 'Khách Hàng Tin Dùng', value: 232 },
        { label: 'Dự Án Hoàn Thành', value: 521 },
        { label: 'Giờ Hỗ Trợ Kỹ Thuật', value: 1453 },
        { label: 'Thành Viên Đội Ngũ', value: 32 }
      ]
    };

    this.defaultServicesSettings = {
      title: 'Dịch Vụ Của Chúng Tôi',
      description: 'Nemark cung cấp các giải pháp công nghệ toàn diện giúp doanh nghiệp xây dựng thương hiệu – tối ưu vận hành – chuyển đổi số hiệu quả.',
      items: [
        {
          icon: 'LineChartOutlined',
          title: 'Thiết Kế Website Chuyên Nghiệp',
          description: 'Xây dựng website tối ưu SEO, giao diện hiện đại, tốc độ cao, tương thích mọi thiết bị, phù hợp mọi mô hình kinh doanh.',
          link: '#'
        },
        {
          icon: 'RobotOutlined',
          title: 'Giải Pháp AI & Tự Động Hóa',
          description: 'Ứng dụng AI chatbot, phân tích dữ liệu, tự động hóa quy trình bán hàng & chăm sóc khách hàng giúp doanh nghiệp tăng hiệu suất vượt trội.',
          link: '#'
        },
        {
          icon: 'AppstoreAddOutlined',
          title: 'Phát Triển Phần Mềm Theo Yêu Cầu',
          description: 'Xây dựng ứng dụng CRM, ERP, hệ thống quản lý bán hàng, quản lý vận hành với quy trình linh hoạt theo nhu cầu riêng của doanh nghiệp.',
          link: '#'
        },
        {
          icon: 'CloudServerOutlined',
          title: 'Hosting – VPS – Server',
          description: 'Hạ tầng tốc độ cao, bảo mật mạnh mẽ, uptime 99.9%, backup mỗi ngày. Đội ngũ kỹ thuật hỗ trợ 24/7, đảm bảo hệ thống hoạt động ổn định.',
          link: '#'
        },
        {
          icon: 'SettingOutlined',
          title: 'Quản Trị & Vận Hành Website',
          description: 'Cập nhật nội dung, tối ưu SEO, đảm bảo tốc độ, khắc phục lỗi nhanh chóng. Dành cho doanh nghiệp không có đội ngũ kỹ thuật riêng.',
          link: '#'
        },
        {
          icon: 'SearchOutlined',
          title: 'SEO & Digital Marketing',
          description: 'Triển khai SEO tổng thể, quảng cáo Google/Facebook, tăng trưởng traffic, tối ưu chuyển đổi và phát triển thương hiệu online bền vững.',
          link: '#'
        }
      ]
    };

    this.defaultCtaSettings = {
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

    this.defaultPortfolioSettings = {
      title: 'Dự Án Tiêu Biểu',
      description: 'Các dự án Nemark đã triển khai, bao gồm website doanh nghiệp, ứng dụng, phần mềm quản lý, hệ thống thương mại điện tử và các giải pháp thương hiệu số.',
      categories: [
        { key: '*', label: 'Tất Cả' },
        { key: 'app', label: 'Ứng Dụng' },
        { key: 'product', label: 'Sản Phẩm' },
        { key: 'branding', label: 'Thương Hiệu' },
        { key: 'books', label: 'Tài Liệu / Ấn Phẩm' }
      ],
      items: [
        { id: 1, category: 'app', title: 'Ứng Dụng Quản Lý', desc: 'Giải pháp quản lý bán hàng & vận hành dành cho doanh nghiệp SMEs.', img: '/assets/img/portfolio/app-1.jpg', enabled: true },
        { id: 2, category: 'product', title: 'Website Thương Mại', desc: 'Hệ thống website bán hàng tối ưu SEO & trải nghiệm người dùng.', img: '/assets/img/portfolio/product-1.jpg', enabled: true },
        { id: 3, category: 'branding', title: 'Thiết Kế Thương Hiệu', desc: 'Bộ nhận diện doanh nghiệp đồng bộ và hiện đại.', img: '/assets/img/portfolio/branding-1.jpg', enabled: true },
        { id: 4, category: 'books', title: 'Tài Liệu Sản Phẩm', desc: 'Tài liệu hướng dẫn & ấn phẩm giới thiệu giải pháp công nghệ.', img: '/assets/img/portfolio/books-1.jpg', enabled: true },
        { id: 5, category: 'app', title: 'Ứng Dụng Mobile', desc: 'Ứng dụng chăm sóc khách hàng & đặt lịch dịch vụ cho doanh nghiệp.', img: '/assets/img/portfolio/app-2.jpg', enabled: true },
        { id: 6, category: 'product', title: 'Website Dịch Vụ', desc: 'Giải pháp website đặt lịch và bán dịch vụ chuyên nghiệp.', img: '/assets/img/portfolio/product-2.jpg', enabled: true },
        { id: 7, category: 'branding', title: 'Logo & Bộ Nhận Diện', desc: 'Xây dựng hình ảnh thương hiệu theo phong cách hiện đại.', img: '/assets/img/portfolio/branding-2.jpg', enabled: true },
        { id: 8, category: 'books', title: 'Ấn Phẩm Số', desc: 'Thiết kế tài liệu digital phục vụ quảng cáo & truyền thông.', img: '/assets/img/portfolio/books-2.jpg', enabled: true },
        { id: 9, category: 'app', title: 'Ứng Dụng Doanh Nghiệp', desc: 'Giải pháp tối ưu vận hành & quản lý nội bộ cho doanh nghiệp.', img: '/assets/img/portfolio/app-3.jpg', enabled: true },
        { id: 10, category: 'product', title: 'Website Doanh Nghiệp', desc: 'Website giới thiệu công ty chuẩn SEO, giao diện chuyên nghiệp.', img: '/assets/img/portfolio/product-3.jpg', enabled: true },
        { id: 11, category: 'branding', title: 'Thiết Kế Bộ Nhận Diện', desc: 'Thiết kế đồng bộ hình ảnh, nâng tầm thương hiệu doanh nghiệp.', img: '/assets/img/portfolio/branding-3.jpg', enabled: true },
        { id: 12, category: 'books', title: 'Tài Liệu Doanh Nghiệp', desc: 'Tài liệu, infographic và báo cáo trình bày hiện đại.', img: '/assets/img/portfolio/books-3.jpg', enabled: true }
      ],
      visible: true,
      columns: 3,
      showFilter: true,
      enableAnimation: true
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

  /**
   * Get stats settings
   */
  async getStatsSettings() {
    const settings = await storage.read(this.statsFileName);
    if (!settings) return this.defaultStatsSettings;
    
    return {
      ...this.defaultStatsSettings,
      ...settings,
      stats: settings.stats || this.defaultStatsSettings.stats
    };
  }

  /**
   * Update stats settings
   */
  async updateStatsSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.statsFileName, toSave);
  }

  /**
   * Reset stats settings
   */
  async resetStatsSettings() {
    return await storage.write(this.statsFileName, this.defaultStatsSettings);
  }

  /**
   * Get services settings
   */
  async getServicesSettings() {
    const settings = await storage.read(this.servicesFileName);
    if (!settings) return this.defaultServicesSettings;
    
    return {
      ...this.defaultServicesSettings,
      ...settings,
      items: settings.items || this.defaultServicesSettings.items
    };
  }

  /**
   * Update services settings
   */
  async updateServicesSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.servicesFileName, toSave);
  }

  /**
   * Reset services settings
   */
  async resetServicesSettings() {
    return await storage.write(this.servicesFileName, this.defaultServicesSettings);
  }

  /**
   * Get CTA settings
   */
  async getCtaSettings() {
    const settings = await storage.read(this.ctaFileName);
    if (!settings) return this.defaultCtaSettings;
    
    return {
      ...this.defaultCtaSettings,
      ...settings,
      background: { ...this.defaultCtaSettings.background, ...settings.background },
      overlay: { ...this.defaultCtaSettings.overlay, ...settings.overlay },
      button: { ...this.defaultCtaSettings.button, ...settings.button }
    };
  }

  /**
   * Update CTA settings
   */
  async updateCtaSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.ctaFileName, toSave);
  }

  /**
   * Reset CTA settings
   */
  async resetCtaSettings() {
    return await storage.write(this.ctaFileName, this.defaultCtaSettings);
  }

  /**
   * Get portfolio settings
   */
  async getPortfolioSettings() {
    const settings = await storage.read(this.portfolioFileName);
    if (!settings) return this.defaultPortfolioSettings;
    
    return {
      ...this.defaultPortfolioSettings,
      ...settings,
      categories: settings.categories || this.defaultPortfolioSettings.categories,
      items: settings.items || this.defaultPortfolioSettings.items
    };
  }

  /**
   * Update portfolio settings
   */
  async updatePortfolioSettings(data) {
    const toSave = {
      ...data,
      lastUpdated: Date.now()
    };
    return await storage.write(this.portfolioFileName, toSave);
  }

  /**
   * Reset portfolio settings
   */
  async resetPortfolioSettings() {
    return await storage.write(this.portfolioFileName, this.defaultPortfolioSettings);
  }
}

module.exports = new SettingsModel();
