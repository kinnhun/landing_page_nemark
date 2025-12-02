import React from 'react'
import { LineChartOutlined, RobotOutlined, AppstoreAddOutlined, CloudServerOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">Dịch Vụ Của Chúng Tôi</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Nemark cung cấp các giải pháp công nghệ toàn diện giúp doanh nghiệp 
          xây dựng thương hiệu – tối ưu vận hành – chuyển đổi số hiệu quả.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Thiết kế Website */}
          <div className="group" data-aos="fade-up" data-aos-delay="100">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-gray-50 hover:border-blue-500">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-500 group-hover:border-blue-500">
                <LineChartOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">Thiết Kế Website Chuyên Nghiệp</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Xây dựng website tối ưu SEO, giao diện hiện đại, tốc độ cao, 
                tương thích mọi thiết bị, phù hợp mọi mô hình kinh doanh.
              </p>
            </div>
          </div>

          {/* AI & Automation */}
          <div className="group" data-aos="fade-up" data-aos-delay="200">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-gray-50 hover:border-blue-500">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-500 group-hover:border-blue-500">
                <RobotOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">Giải Pháp AI & Tự Động Hóa</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ứng dụng AI chatbot, phân tích dữ liệu, tự động hóa quy trình bán hàng 
                & chăm sóc khách hàng giúp doanh nghiệp tăng hiệu suất vượt trội.
              </p>
            </div>
          </div>

          {/* Phần mềm theo yêu cầu */}
          <div className="group" data-aos="fade-up" data-aos-delay="300">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-gray-50 hover:border-blue-500">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-500 group-hover:border-blue-500">
                <AppstoreAddOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">Phát Triển Phần Mềm Theo Yêu Cầu</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Xây dựng ứng dụng CRM, ERP, hệ thống quản lý bán hàng, quản lý vận hành 
                với quy trình linh hoạt theo nhu cầu riêng của doanh nghiệp.
              </p>
            </div>
          </div>

          {/* Hosting & VPS */}
          <div className="group" data-aos="fade-up" data-aos-delay="400">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-gray-50 hover:border-blue-500">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-500 group-hover:border-blue-500">
                <CloudServerOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">Hosting – VPS – Server</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Hạ tầng tốc độ cao, bảo mật mạnh mẽ, uptime 99.9%, backup mỗi ngày. 
                Đội ngũ kỹ thuật hỗ trợ 24/7, đảm bảo hệ thống hoạt động ổn định.
              </p>
            </div>
          </div>

          {/* Quản trị website */}
          <div className="group" data-aos="fade-up" data-aos-delay="500">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-gray-50 hover:border-blue-500">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-500 group-hover:border-blue-500">
                <SettingOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">Quản Trị & Vận Hành Website</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cập nhật nội dung, tối ưu SEO, đảm bảo tốc độ, khắc phục lỗi nhanh chóng. 
                Dành cho doanh nghiệp không có đội ngũ kỹ thuật riêng.
              </p>
            </div>
          </div>

          {/* Marketing & SEO */}
          <div className="group" data-aos="fade-up" data-aos-delay="600">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-gray-50 hover:border-blue-500">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-500 group-hover:border-blue-500">
                <SearchOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">SEO & Digital Marketing</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Triển khai SEO tổng thể, quảng cáo Google/Facebook, tăng trưởng traffic, 
                tối ưu chuyển đổi và phát triển thương hiệu online bền vững.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Services
