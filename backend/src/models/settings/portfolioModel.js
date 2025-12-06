const BaseModel = require('./baseModel');

const defaultPortfolioSettings = {
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

class PortfolioModel extends BaseModel {
  constructor() {
    super('portfolio-settings.json', defaultPortfolioSettings);
  }

  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings,
      categories: settings.categories || this.defaultSettings.categories,
      items: settings.items || this.defaultSettings.items
    };
  }
}

module.exports = new PortfolioModel();

