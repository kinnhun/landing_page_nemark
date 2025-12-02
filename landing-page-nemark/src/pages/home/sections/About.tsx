import React from 'react'

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row gy-4">

          {/* Hình ảnh + Video */}
          <div 
            className="col-lg-6 position-relative d-flex align-items-center order-lg-last" 
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            <img src="/assets/img/about.jpg" className="img-fluid flex-shrink-0" alt="Nemark About" />
            <a 
              href="https://www.youtube.com/watch?v=z2EYAGlwBB0&list=RDz2EYAGlwBB0&start_radio=1" 
              className="glightbox pulsating-play-btn"
            ></a>
          </div>

          {/* Nội dung giới thiệu */}
          <div 
            className="col-lg-6 content" 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            <h3>Giới Thiệu Về Nemark</h3>
            <p>
              Nemark là đơn vị cung cấp giải pháp số toàn diện cho doanh nghiệp, 
              bao gồm: thiết kế website, phát triển phần mềm theo yêu cầu, AI automation 
              và hệ thống hosting/vps chuyên nghiệp. Chúng tôi mang đến những sản phẩm 
              hiện đại, tối ưu trải nghiệm người dùng và hỗ trợ doanh nghiệp chuyển đổi số hiệu quả.
            </p>

            <ul>
              <li>
                <i className="bi bi-diagram-3"></i>
                <div>
                  <h5>Thiết Kế Website & Giải Pháp Thương Hiệu</h5>
                  <p>
                    Website chuẩn SEO, giao diện hiện đại, tốc độ cao và tối ưu chuyển đổi — 
                    phù hợp mọi ngành nghề và mô hình kinh doanh.
                  </p>
                </div>
              </li>

              <li>
                <i className="bi bi-fullscreen-exit"></i>
                <div>
                  <h5>Phần Mềm, Ứng Dụng & Tự Động Hóa</h5>
                  <p>
                    Phát triển phần mềm theo yêu cầu (CRM, ERP, quản lý bán hàng), 
                    tích hợp AI và tự động hóa quy trình giúp doanh nghiệp nâng cao hiệu suất.
                  </p>
                </div>
              </li>

              <li>
                <i className="bi bi-broadcast"></i>
                <div>
                  <h5>Hạ Tầng Hosting – Server – Bảo Mật</h5>
                  <p>
                    Cung cấp hosting/VPS tốc độ cao, ổn định, bảo mật mạnh mẽ, backup mỗi ngày 
                    và hỗ trợ kỹ thuật 24/7 nhằm đảm bảo hệ thống vận hành liên tục.
                  </p>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
