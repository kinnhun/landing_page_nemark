import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Liên Hệ</h2>
        <p>
          Kết nối với Nemark để được tư vấn giải pháp thiết kế website, phần mềm
          và chuyển đổi số phù hợp nhất với doanh nghiệp của bạn.
        </p>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="mb-4" data-aos="fade-up" data-aos-delay="200">
          <iframe
            style={{ border: 0, width: "100%", height: "270px" }}
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d852.1937909854214!2d105.52725492844415!3d21.03454125052297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDAyJzA0LjMiTiAxMDXCsDMxJzQwLjQiRQ!5e1!3m2!1sen!2sus!4v1764665508647!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="row gy-4">
          {/* THÔNG TIN LIÊN HỆ */}
          <div className="col-lg-4">
            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Địa Chỉ</h3>
                <p>Hà Nội, Việt Nam</p>
              </div>
            </div>

            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Hotline</h3>
                <p>0123456789</p>
              </div>
            </div>

            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email</h3>
                <p>contact@nemark.vn</p>
              </div>
            </div>
          </div>

          {/* FORM LIÊN HỆ */}
          <div className="col-lg-8">
            <form
              action="#"
              method="post"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Họ và tên"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Tiêu đề"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="message"
                    rows={6}
                    placeholder="Nội dung liên hệ"
                    required
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <div className="loading">Đang gửi...</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Tin nhắn của bạn đã được gửi. Cảm ơn bạn!
                  </div>

                  <button type="submit">Gửi Tin Nhắn</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
