import React from "react";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 text-center mb-12">
        <Reveal direction="up">
          <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">Liên Hệ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kết nối với Nemark để được tư vấn giải pháp thiết kế website, phần mềm
            và chuyển đổi số phù hợp nhất với doanh nghiệp của bạn.
          </p>
        </Reveal>
      </div>
      <div className="container mx-auto px-4">
        <Reveal width="100%" delay={0.2}>
          <div className="mb-8 rounded-lg overflow-hidden shadow-sm">
            <iframe
              style={{ border: 0, width: "100%", height: "270px" }}
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d852.1937909854214!2d105.52725492844415!3d21.03454125052297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDAyJzA0LjMiTiAxMDXCsDMxJzQwLjQiRQ!5e1!3m2!1sen!2sus!4v1764665508647!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Reveal>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* THÔNG TIN LIÊN HỆ */}
          <div className="lg:w-1/3 space-y-6">
            <StaggerContainer className="space-y-6">
              <StaggerItem>
                <div
                  className="flex items-start p-6 bg-white shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-teal-500 text-white rounded-full flex items-center justify-center text-xl mr-4 shrink-0">
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Địa Chỉ</h3>
                    <p className="text-gray-600 text-sm">Hà Nội, Việt Nam</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div
                  className="flex items-start p-6 bg-white shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-teal-500 text-white rounded-full flex items-center justify-center text-xl mr-4 shrink-0">
                    <PhoneOutlined />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Hotline</h3>
                    <p className="text-gray-600 text-sm">0123456789</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div
                  className="flex items-start p-6 bg-white shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-teal-500 text-white rounded-full flex items-center justify-center text-xl mr-4 shrink-0">
                    <MailOutlined />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">contact@nemark.vn</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* FORM LIÊN HỆ */}
          <div className="lg:w-2/3">
            <Reveal width="100%" delay={0.4}>
              <form
                action="#"
                method="post"
                className="bg-white p-8 shadow-sm rounded-lg border border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Họ và tên"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    name="subject"
                    placeholder="Tiêu đề"
                    required
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    name="message"
                    rows={6}
                    placeholder="Nội dung liên hệ"
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button 
                    type="submit"
                    className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                  >
                    Gửi Tin Nhắn
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
