import React from 'react'

const HomeBanner = () => {
  return (
    <section id="hero" className="hero section dark-background">
      <img src="/assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />

      <div className="container text-center" data-aos="fade-up" data-aos-delay="100">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h2>Giải Pháp Số Toàn Diện Cho Doanh Nghiệp</h2>
            <p>
              Nemark cung cấp dịch vụ thiết kế website, phát triển phần mềm, AI automation 
              và hệ thống hosting/vps giúp doanh nghiệp tối ưu vận hành & tăng trưởng doanh số.
            </p>
            <a href="#about" className="btn-get-started">Khám Phá Ngay</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
