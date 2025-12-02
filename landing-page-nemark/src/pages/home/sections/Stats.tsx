import React from 'react'

const Stats = () => {
  return (
    <section id="stats" className="stats section light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        
        <div className="row gy-4">
          
          {/* Khách hàng */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span 
                data-purecounter-start="0" 
                data-purecounter-end="232" 
                data-purecounter-duration="1" 
                className="purecounter"
              ></span>
              <p>Khách Hàng Tin Dùng</p>
            </div>
          </div>

          {/* Dự án */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span 
                data-purecounter-start="0" 
                data-purecounter-end="521" 
                data-purecounter-duration="1" 
                className="purecounter"
              ></span>
              <p>Dự Án Hoàn Thành</p>
            </div>
          </div>

          {/* Giờ hỗ trợ */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span 
                data-purecounter-start="0" 
                data-purecounter-end="1453" 
                data-purecounter-duration="1" 
                className="purecounter"
              ></span>
              <p>Giờ Hỗ Trợ Kỹ Thuật</p>
            </div>
          </div>

          {/* Nhân sự */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span 
                data-purecounter-start="0" 
                data-purecounter-end="32" 
                data-purecounter-duration="1" 
                className="purecounter"
              ></span>
              <p>Thành Viên Đội Ngũ</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Stats
