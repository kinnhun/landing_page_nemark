const BaseModel = require('./baseModel');

const defaultAboutSettings = {
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

class AboutModel extends BaseModel {
  constructor() {
    super('about-settings.json', defaultAboutSettings);
  }

  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings,
      features: settings.features || this.defaultSettings.features
    };
  }
}

module.exports = new AboutModel();

