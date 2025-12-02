import React from 'react'

const Team = () => {
  return (
    <section id="team" className="team section">

      <div className="container section-title" data-aos="fade-up">
        <h2>Đội Ngũ Nemark</h2>
        <p>
          Những chuyên gia giàu kinh nghiệm trong lĩnh vực thiết kế website, phần mềm, 
          AI automation và giải pháp số, luôn sẵn sàng đồng hành cùng doanh nghiệp.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">

          {/* CEO */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="team-member d-flex align-items-start">
              <div className="pic">
                <img src="/assets/img/team/team-1.jpg" className="img-fluid" alt="" />
              </div>
              <div className="member-info">
                <h4>Nguyễn Minh Khôi</h4>
                <span>Giám Đốc Điều Hành</span>
                <p>
                  Người sáng lập Nemark với tầm nhìn xây dựng hệ sinh thái giải pháp số 
                  giúp doanh nghiệp phát triển bền vững trong thời đại công nghệ.
                </p>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Product Manager */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div className="team-member d-flex align-items-start">
              <div className="pic">
                <img src="/assets/img/team/team-2.jpg" className="img-fluid" alt="" />
              </div>
              <div className="member-info">
                <h4>Trần Thu Hà</h4>
                <span>Quản Lý Sản Phẩm</span>
                <p>
                  Chịu trách nhiệm xây dựng và hoạch định sản phẩm website – phần mềm, 
                  đảm bảo trải nghiệm người dùng mượt mà và hiệu quả.
                </p>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* CTO */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div className="team-member d-flex align-items-start">
              <div className="pic">
                <img src="/assets/img/team/team-3.jpg" className="img-fluid" alt="" />
              </div>
              <div className="member-info">
                <h4>Phạm Hoàng Long</h4>
                <span>Giám Đốc Công Nghệ</span>
                <p>
                  Chuyên gia giải pháp AI, tự động hóa và hệ thống phần mềm với hơn 10 năm 
                  kinh nghiệm phát triển các nền tảng công nghệ phức tạp.
                </p>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Kế toán / Vận hành */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
            <div className="team-member d-flex align-items-start">
              <div className="pic">
                <img src="/assets/img/team/team-4.jpg" className="img-fluid" alt="" />
              </div>
              <div className="member-info">
                <h4>Lê Mai Anh</h4>
                <span>Trưởng Phòng Vận Hành</span>
                <p>
                  Đảm bảo quy trình làm việc hiệu quả, quản lý dự án và chăm sóc khách hàng 
                  giúp Nemark duy trì chất lượng dịch vụ cao nhất.
                </p>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Team
