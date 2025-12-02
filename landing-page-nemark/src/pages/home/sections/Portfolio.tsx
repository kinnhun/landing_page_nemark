import React from 'react'

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            <li data-filter="*" className="filter-active">All</li>
            <li data-filter=".filter-app">App</li>
            <li data-filter=".filter-product">Product</li>
            <li data-filter=".filter-branding">Branding</li>
            <li data-filter=".filter-books">Books</li>
          </ul>

          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/app-1.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/app-1.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">App 1</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/product-1.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/product-1.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Product 1</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/branding-1.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/branding-1.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Branding 1</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/books-1.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/books-1.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Books 1</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/app-2.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/app-2.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">App 2</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/product-2.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/product-2.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Product 2</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/branding-2.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/branding-2.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Branding 2</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/books-2.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/books-2.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Books 2</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/app-3.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/app-3.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">App 3</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/product-3.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/product-3.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Product 3</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/branding-3.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/branding-3.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Branding 3</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
              <div className="portfolio-content h-100">
                <a href="/assets/img/portfolio/books-3.jpg" data-gallery="portfolio-gallery-app" className="glightbox"><img src="/assets/img/portfolio/books-3.jpg" className="img-fluid" alt="" /></a>
                <div className="portfolio-info">
                  <h4><a href="#" title="More Details">Books 3</a></h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
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
