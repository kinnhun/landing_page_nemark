import React from 'react'

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio section">

      <div className="container section-title" data-aos="fade-up">
        <h2>Dự Án Tiêu Biểu</h2>
        <p>
          Các dự án Nemark đã triển khai, bao gồm website doanh nghiệp, ứng dụng, phần mềm
          quản lý, hệ thống thương mại điện tử và các giải pháp thương hiệu số.
        </p>
      </div>

      <div className="container">
        <div 
          className="isotope-layout"
          data-default-filter="*" 
          data-layout="masonry" 
          data-sort="original-order"
        >

          {/* BỘ LỌC */}
          <ul 
            className="portfolio-filters isotope-filters" 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            <li data-filter="*" className="filter-active">Tất Cả</li>
            <li data-filter=".filter-app">Ứng Dụng</li>
            <li data-filter=".filter-product">Sản Phẩm</li>
            <li data-filter=".filter-branding">Thương Hiệu</li>
            <li data-filter=".filter-books">Tài Liệu / Ấn Phẩm</li>
          </ul>

          {/* DANH SÁCH DỰ ÁN */}
          <div 
            className="row gy-4 isotope-container" 
            data-aos="fade-up" 
            data-aos-delay="200"
          >

            {/* APP 1 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/app-1.jpg" 
                  data-gallery="portfolio-gallery-app" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/app-1.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Ứng Dụng Quản Lý</a></h4>
                  <p>Giải pháp quản lý bán hàng & vận hành dành cho doanh nghiệp SMEs.</p>
                </div>
              </div>
            </div>

            {/* PRODUCT 1 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/product-1.jpg" 
                  data-gallery="portfolio-gallery-product" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/product-1.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Website Thương Mại</a></h4>
                  <p>Hệ thống website bán hàng tối ưu SEO & trải nghiệm người dùng.</p>
                </div>
              </div>
            </div>

            {/* BRANDING 1 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/branding-1.jpg" 
                  data-gallery="portfolio-gallery-branding" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/branding-1.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Thiết Kế Thương Hiệu</a></h4>
                  <p>Bộ nhận diện doanh nghiệp đồng bộ và hiện đại.</p>
                </div>
              </div>
            </div>

            {/* BOOKS 1 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/books-1.jpg" 
                  data-gallery="portfolio-gallery-book" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/books-1.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Tài Liệu Sản Phẩm</a></h4>
                  <p>Tài liệu hướng dẫn & ấn phẩm giới thiệu giải pháp công nghệ.</p>
                </div>
              </div>
            </div>

            {/* APP 2 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/app-2.jpg" 
                  data-gallery="portfolio-gallery-app" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/app-2.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Ứng Dụng Mobile</a></h4>
                  <p>Ứng dụng chăm sóc khách hàng & đặt lịch dịch vụ cho doanh nghiệp.</p>
                </div>
              </div>
            </div>

            {/* PRODUCT 2 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/product-2.jpg" 
                  data-gallery="portfolio-gallery-product" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/product-2.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Website Dịch Vụ</a></h4>
                  <p>Giải pháp website đặt lịch và bán dịch vụ chuyên nghiệp.</p>
                </div>
              </div>
            </div>

            {/* BRANDING 2 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/branding-2.jpg" 
                  data-gallery="portfolio-gallery-branding" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/branding-2.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Logo & Bộ Nhận Diện</a></h4>
                  <p>Xây dựng hình ảnh thương hiệu theo phong cách hiện đại.</p>
                </div>
              </div>
            </div>

            {/* BOOKS 2 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/books-2.jpg" 
                  data-gallery="portfolio-gallery-book" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/books-2.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Ấn Phẩm Số</a></h4>
                  <p>Thiết kế tài liệu digital phục vụ quảng cáo & truyền thông.</p>
                </div>
              </div>
            </div>

            {/* APP 3 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/app-3.jpg" 
                  data-gallery="portfolio-gallery-app" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/app-3.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Ứng Dụng Doanh Nghiệp</a></h4>
                  <p>Giải pháp tối ưu vận hành & quản lý nội bộ cho doanh nghiệp.</p>
                </div>
              </div>
            </div>

            {/* PRODUCT 3 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/product-3.jpg" 
                  data-gallery="portfolio-gallery-product" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/product-3.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Website Doanh Nghiệp</a></h4>
                  <p>Website giới thiệu công ty chuẩn SEO, giao diện chuyên nghiệp.</p>
                </div>
              </div>
            </div>

            {/* BRANDING 3 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/branding-3.jpg" 
                  data-gallery="portfolio-gallery-branding" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/branding-3.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Thiết Kế Bộ Nhận Diện</a></h4>
                  <p>Thiết kế đồng bộ hình ảnh, nâng tầm thương hiệu doanh nghiệp.</p>
                </div>
              </div>
            </div>

            {/* BOOKS 3 */}
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
              <div className="portfolio-content h-100">
                <a 
                  href="/assets/img/portfolio/books-3.jpg" 
                  data-gallery="portfolio-gallery-book" 
                  className="glightbox"
                >
                  <img src="/assets/img/portfolio/books-3.jpg" className="img-fluid" alt="" />
                </a>
                <div className="portfolio-info">
                  <h4><a title="Xem chi tiết">Tài Liệu Doanh Nghiệp</a></h4>
                  <p>Tài liệu, infographic và báo cáo trình bày hiện đại.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  )
}

export default Portfolio
