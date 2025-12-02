import React from 'react'

const Pricing = () => {
  return (
    <section id="pricing" className="pricing section">

      <div className="container section-title" data-aos="fade-up">
        <h2>Bảng Giá Dịch Vụ</h2>
        <p>
          Nemark cung cấp các gói dịch vụ linh hoạt phù hợp với mọi nhu cầu — 
          từ khởi tạo website cơ bản đến giải pháp doanh nghiệp chuyên sâu.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">

          {/* GOI CO BAN */}
          <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="100">
            <div className="pricing-item">
              <h3>Gói Cơ Bản</h3>
              <p className="description">
                Phù hợp cá nhân hoặc cửa hàng nhỏ muốn có website giới thiệu nhanh chóng, chi phí tiết kiệm.
              </p>
              <h4><sup>₫</sup>0<span> / tháng</span></h4>
              <a href="#contact" className="cta-btn">Dùng Thử Miễn Phí</a>
              <p className="text-center small">Không yêu cầu thẻ thanh toán</p>

              <ul>
                <li><i className="bi bi-check"></i> <span>Website giao diện sẵn</span></li>
                <li><i className="bi bi-check"></i> <span>Tối ưu chuẩn SEO cơ bản</span></li>
                <li><i className="bi bi-check"></i> <span>Hosting miễn phí 1GB</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Tùy chỉnh giao diện nâng cao</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Tích hợp AI automation</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Hỗ trợ kỹ thuật 24/7</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Quản trị nội dung định kỳ</span></li>
              </ul>
            </div>
          </div>

          {/* GOI DOANH NGHIEP */}
          <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="200">
            <div className="pricing-item featured">
              <p className="popular">Phổ Biến</p>
              <h3>Gói Doanh Nghiệp</h3>
              <p className="description">
                Dành cho doanh nghiệp muốn website chuyên nghiệp, đầy đủ tính năng, tối ưu bán hàng & thương hiệu.
              </p>
              <h4><sup>₫</sup>2.900.000<span> / tháng</span></h4>
              <a href="#contact" className="cta-btn">Đăng Ký Ngay</a>
              <p className="text-center small">Miễn phí tư vấn & demo</p>

              <ul>
                <li><i className="bi bi-check"></i> <span>Thiết kế giao diện theo thương hiệu</span></li>
                <li><i className="bi bi-check"></i> <span>Tối ưu SEO nâng cao</span></li>
                <li><i className="bi bi-check"></i> <span>Hosting doanh nghiệp 10GB</span></li>
                <li><i className="bi bi-check"></i> <span>Tích hợp thanh toán & vận chuyển</span></li>
                <li><i className="bi bi-check"></i> <span>Tích hợp AI chatbot trả lời tự động</span></li>
                <li><i className="bi bi-check"></i> <span>Hỗ trợ kỹ thuật 24/7</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Phát triển phần mềm theo yêu cầu</span></li>
              </ul>
            </div>
          </div>

          {/* GOI CHUYEN SAU */}
          <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="300">
            <div className="pricing-item">
              <h3>Gói Chuyên Sâu</h3>
              <p className="description">
                Gói giải pháp toàn diện bao gồm website + phần mềm + AI + hệ thống vận hành riêng cho doanh nghiệp.
              </p>
              <h4><sup>₫</sup>4.900.000<span> / tháng</span></h4>
              <a href="#contact" className="cta-btn">Nhận Tư Vấn</a>
              <p className="text-center small">Cam kết hiệu quả & bảo trì dài hạn</p>

              <ul>
                <li><i className="bi bi-check"></i> <span>Thiết kế website cao cấp theo yêu cầu</span></li>
                <li><i className="bi bi-check"></i> <span>Xây dựng phần mềm/CRM theo quy trình của bạn</span></li>
                <li><i className="bi bi-check"></i> <span>Tối ưu SEO tổng thể + content chuẩn SEO</span></li>
                <li><i className="bi bi-check"></i> <span>Tích hợp AI automation & phân tích dữ liệu</span></li>
                <li><i className="bi bi-check"></i> <span>Hosting/VPS riêng – bảo mật cao</span></li>
                <li><i className="bi bi-check"></i> <span>Quản trị website hằng tháng</span></li>
                <li><i className="bi bi-check"></i> <span>Hỗ trợ kỹ thuật ưu tiên 24/7</span></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Pricing
