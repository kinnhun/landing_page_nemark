const BaseModel = require('./baseModel');

const defaultServicesSettings = {
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

class ServicesModel extends BaseModel {
  constructor() {
    super('services-settings.json', defaultServicesSettings);
  }

  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings,
      items: settings.items || this.defaultSettings.items
    };
  }
}

module.exports = new ServicesModel();

