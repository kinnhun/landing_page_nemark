import React from 'react'
import { LineChartOutlined, RobotOutlined, AppstoreAddOutlined, CloudServerOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import { StaggerContainer, StaggerItem, Reveal } from '@/components/Reveal';

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-16">
        <Reveal direction="up">
          <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">Dịch Vụ Của Chúng Tôi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nemark cung cấp các giải pháp công nghệ toàn diện giúp doanh nghiệp 
            xây dựng thương hiệu – tối ưu vận hành – chuyển đổi số hiệu quả.
          </p>
        </Reveal>
      </div>

      <div className="container mx-auto px-4">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Thiết kế Website */}
          <StaggerItem className="group">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-white hover:border-teal-400 hover:-translate-y-2 hover:shadow-xl rounded-lg">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-linear-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:scale-110 shadow-md">
                <LineChartOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Thiết Kế Website Chuyên Nghiệp</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Xây dựng website tối ưu SEO, giao diện hiện đại, tốc độ cao, 
                tương thích mọi thiết bị, phù hợp mọi mô hình kinh doanh.
              </p>
            </div>
          </StaggerItem>

          {/* AI & Automation */}
          <StaggerItem className="group">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-white hover:border-teal-400 hover:-translate-y-2 hover:shadow-xl rounded-lg">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-linear-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:scale-110 shadow-md">
                <RobotOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Giải Pháp AI & Tự Động Hóa</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ứng dụng AI chatbot, phân tích dữ liệu, tự động hóa quy trình bán hàng 
                & chăm sóc khách hàng giúp doanh nghiệp tăng hiệu suất vượt trội.
              </p>
            </div>
          </StaggerItem>

          {/* Phần mềm theo yêu cầu */}
          <StaggerItem className="group">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-white hover:border-teal-400 hover:-translate-y-2 hover:shadow-xl rounded-lg">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-linear-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:scale-110 shadow-md">
                <AppstoreAddOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Phát Triển Phần Mềm Theo Yêu Cầu</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Xây dựng ứng dụng CRM, ERP, hệ thống quản lý bán hàng, quản lý vận hành 
                với quy trình linh hoạt theo nhu cầu riêng của doanh nghiệp.
              </p>
            </div>
          </StaggerItem>

          {/* Hosting & VPS */}
          <StaggerItem className="group">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-white hover:border-teal-400 hover:-translate-y-2 hover:shadow-xl rounded-lg">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-linear-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:scale-110 shadow-md">
                <CloudServerOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Hosting – VPS – Server</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Hạ tầng tốc độ cao, bảo mật mạnh mẽ, uptime 99.9%, backup mỗi ngày. 
                Đội ngũ kỹ thuật hỗ trợ 24/7, đảm bảo hệ thống hoạt động ổn định.
              </p>
            </div>
          </StaggerItem>

          {/* Quản trị website */}
          <StaggerItem className="group">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-white hover:border-teal-400 hover:-translate-y-2 hover:shadow-xl rounded-lg">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-linear-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:scale-110 shadow-md">
                <SettingOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Quản Trị & Vận Hành Website</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cập nhật nội dung, tối ưu SEO, đảm bảo tốc độ, khắc phục lỗi nhanh chóng. 
                Dành cho doanh nghiệp không có đội ngũ kỹ thuật riêng.
              </p>
            </div>
          </StaggerItem>

          {/* Marketing & SEO */}
          <StaggerItem className="group">
            <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-white hover:border-teal-400 hover:-translate-y-2 hover:shadow-xl rounded-lg">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-linear-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:scale-110 shadow-md">
                <SearchOutlined />
              </div>
              <a className="block mt-4 mb-4 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">SEO & Digital Marketing</h3>
              </a>
              <p className="text-sm text-gray-600 leading-relaxed">
                Triển khai SEO tổng thể, quảng cáo Google/Facebook, tăng trưởng traffic, 
                tối ưu chuyển đổi và phát triển thương hiệu online bền vững.
              </p>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </section>
  )
}

export default Services
