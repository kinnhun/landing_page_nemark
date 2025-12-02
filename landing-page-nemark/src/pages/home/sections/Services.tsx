import React from 'react'

const Services = () => {
  return (
    <section id="services" className="services section">

      <div className="container section-title" data-aos="fade-up">
        <h2>Dịch Vụ Của Chúng Tôi</h2>
        <p>
          Nemark cung cấp các giải pháp công nghệ toàn diện giúp doanh nghiệp 
          xây dựng thương hiệu – tối ưu vận hành – chuyển đổi số hiệu quả.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">

          {/* Thiết kế Website */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-activity"></i>
              </div>
              <a className="stretched-link">
                <h3>Thiết Kế Website Chuyên Nghiệp</h3>
              </a>
              <p>
                Xây dựng website tối ưu SEO, giao diện hiện đại, tốc độ cao, 
                tương thích mọi thiết bị, phù hợp mọi mô hình kinh doanh.
              </p>
            </div>
          </div>

          {/* AI & Automation */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-broadcast"></i>
              </div>
              <a className="stretched-link">
                <h3>Giải Pháp AI & Tự Động Hóa</h3>
              </a>
              <p>
                Ứng dụng AI chatbot, phân tích dữ liệu, tự động hóa quy trình bán hàng 
                & chăm sóc khách hàng giúp doanh nghiệp tăng hiệu suất vượt trội.
              </p>
            </div>
          </div>

          {/* Phần mềm theo yêu cầu */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-easel"></i>
              </div>
              <a className="stretched-link">
                <h3>Phát Triển Phần Mềm Theo Yêu Cầu</h3>
              </a>
              <p>
                Xây dựng ứng dụng CRM, ERP, hệ thống quản lý bán hàng, quản lý vận hành 
                với quy trình linh hoạt theo nhu cầu riêng của doanh nghiệp.
              </p>
            </div>
          </div>

          {/* Hosting & VPS */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-bounding-box-circles"></i>
              </div>
              <a className="stretched-link">
                <h3>Hosting – VPS – Server</h3>
              </a>
              <p>
                Hạ tầng tốc độ cao, bảo mật mạnh mẽ, uptime 99.9%, backup mỗi ngày. 
                Đội ngũ kỹ thuật hỗ trợ 24/7, đảm bảo hệ thống hoạt động ổn định.
              </p>
            </div>
          </div>

          {/* Quản trị website */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-calendar4-week"></i>
              </div>
              <a className="stretched-link">
                <h3>Quản Trị & Vận Hành Website</h3>
              </a>
              <p>
                Cập nhật nội dung, tối ưu SEO, đảm bảo tốc độ, khắc phục lỗi nhanh chóng. 
                Dành cho doanh nghiệp không có đội ngũ kỹ thuật riêng.
              </p>
            </div>
          </div>

          {/* Marketing & SEO */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-chat-square-text"></i>
              </div>
              <a className="stretched-link">
                <h3>SEO & Digital Marketing</h3>
              </a>
              <p>
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
