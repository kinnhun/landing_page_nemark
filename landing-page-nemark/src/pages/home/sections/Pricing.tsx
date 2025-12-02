import React from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-gray-50 scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">Bảng Giá Dịch Vụ</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Nemark cung cấp các gói dịch vụ linh hoạt phù hợp với mọi nhu cầu — 
          từ khởi tạo website cơ bản đến giải pháp doanh nghiệp chuyên sâu.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* GOI CO BAN */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col" data-aos="zoom-in" data-aos-delay="100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gói Cơ Bản</h3>
            <p className="text-sm text-gray-600 mb-6">
              Phù hợp cá nhân hoặc cửa hàng nhỏ muốn có website giới thiệu nhanh chóng, chi phí tiết kiệm.
            </p>
            <div className="text-4xl font-bold text-blue-500 mb-6">
              <sup className="text-xl">₫</sup>0<span className="text-base font-normal text-gray-500"> / tháng</span>
            </div>
            <a href="#contact" className="block w-full py-3 text-center border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300 font-medium mb-2">Dùng Thử Miễn Phí</a>
            <p className="text-center text-xs text-gray-500 mb-8">Không yêu cầu thẻ thanh toán</p>

            <ul className="space-y-4 flex-1">
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Website giao diện sẵn</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Tối ưu chuẩn SEO cơ bản</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Hosting miễn phí 1GB</span></li>
              <li className="flex items-center text-sm text-gray-400 line-through"><CloseOutlined className="text-gray-300 mr-3" /> <span>Tùy chỉnh giao diện nâng cao</span></li>
              <li className="flex items-center text-sm text-gray-400 line-through"><CloseOutlined className="text-gray-300 mr-3" /> <span>Tích hợp AI automation</span></li>
              <li className="flex items-center text-sm text-gray-400 line-through"><CloseOutlined className="text-gray-300 mr-3" /> <span>Hỗ trợ kỹ thuật 24/7</span></li>
              <li className="flex items-center text-sm text-gray-400 line-through"><CloseOutlined className="text-gray-300 mr-3" /> <span>Quản trị nội dung định kỳ</span></li>
            </ul>
          </div>

          {/* GOI DOANH NGHIEP */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-500 flex flex-col relative transform scale-105 z-10" data-aos="zoom-in" data-aos-delay="200">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase">Phổ Biến</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gói Doanh Nghiệp</h3>
            <p className="text-sm text-gray-600 mb-6">
              Dành cho doanh nghiệp muốn website chuyên nghiệp, đầy đủ tính năng, tối ưu bán hàng & thương hiệu.
            </p>
            <div className="text-4xl font-bold text-blue-500 mb-6">
              <sup className="text-xl">₫</sup>2.900.000<span className="text-base font-normal text-gray-500"> / tháng</span>
            </div>
            <a href="#contact" className="block w-full py-3 text-center bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 font-medium mb-2">Đăng Ký Ngay</a>
            <p className="text-center text-xs text-gray-500 mb-8">Miễn phí tư vấn & demo</p>

            <ul className="space-y-4 flex-1">
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Thiết kế giao diện theo thương hiệu</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Tối ưu SEO nâng cao</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Hosting doanh nghiệp 10GB</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Tích hợp thanh toán & vận chuyển</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Tích hợp AI chatbot trả lời tự động</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Hỗ trợ kỹ thuật 24/7</span></li>
              <li className="flex items-center text-sm text-gray-400 line-through"><CloseOutlined className="text-gray-300 mr-3" /> <span>Phát triển phần mềm theo yêu cầu</span></li>
            </ul>
          </div>

          {/* GOI CHUYEN SAU */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col" data-aos="zoom-in" data-aos-delay="300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gói Chuyên Sâu</h3>
            <p className="text-sm text-gray-600 mb-6">
              Gói giải pháp toàn diện bao gồm website + phần mềm + AI + hệ thống vận hành riêng cho doanh nghiệp.
            </p>
            <div className="text-4xl font-bold text-blue-500 mb-6">
              <sup className="text-xl">₫</sup>4.900.000<span className="text-base font-normal text-gray-500"> / tháng</span>
            </div>
            <a href="#contact" className="block w-full py-3 text-center border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300 font-medium mb-2">Nhận Tư Vấn</a>
            <p className="text-center text-xs text-gray-500 mb-8">Cam kết hiệu quả & bảo trì dài hạn</p>

            <ul className="space-y-4 flex-1">
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Thiết kế website cao cấp theo yêu cầu</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Xây dựng phần mềm/CRM theo quy trình của bạn</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Tối ưu SEO tổng thể + content chuẩn SEO</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Tích hợp AI automation & phân tích dữ liệu</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Hosting/VPS riêng – bảo mật cao</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Quản trị website hằng tháng</span></li>
              <li className="flex items-center text-sm text-gray-600"><CheckOutlined className="text-green-500 mr-3" /> <span>Hỗ trợ kỹ thuật ưu tiên 24/7</span></li>
            </ul>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Pricing
