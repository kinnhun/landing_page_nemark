import React from 'react'

const CallToAction = () => {
  return (
    <section id="call-to-action" className="call-to-action section dark-background">
      <img src="/assets/img/cta-bg.jpg" alt="Call To Action" />

      <div className="container">
        <div className="row" data-aos="zoom-in" data-aos-delay="100">

          <div className="col-xl-9 text-center text-xl-start">
            <h3>Đồng Hành Cùng Nemark Trong Hành Trình Chuyển Đổi Số</h3>
            <p>
              Bạn đang cần một website chuyên nghiệp, phần mềm quản lý linh hoạt 
              hay giải pháp AI tự động hóa quy trình? Nemark sẵn sàng hỗ trợ và 
              xây dựng giải pháp phù hợp nhất cho doanh nghiệp của bạn.
            </p>
          </div>

          <div className="col-xl-3 cta-btn-container text-center">
            <a className="cta-btn align-middle" href="#contact">Liên Hệ Ngay</a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CallToAction
