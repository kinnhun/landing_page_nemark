import React, { useState } from 'react'
import Image from 'next/image';
import aboutImg from '../../../../public/assets/img/about.jpg';
import { DeploymentUnitOutlined, CodeOutlined, CloudServerOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="about" className="py-16 bg-white text-gray-600 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Hình ảnh + Video */}
          <div 
            className="lg:w-1/2 relative flex items-center lg:order-last" 
          >
            <Image src={aboutImg} className="w-full h-auto block" alt="Nemark About" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <a 
                    onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                    href="#"
                    className="relative inline-flex rounded-full h-24 w-24 bg-blue-500 items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                    <span className="w-0 h-0 border-t-10 border-t-transparent border-b-10 border-b-transparent border-l-15 border-l-white ml-1"></span>
                </a>
            </div>
          </div>

          {/* Nội dung giới thiệu */}
          <div 
            className="lg:w-1/2" 
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Giới Thiệu Về Nemark</h3>
            <p className="mb-6">
              Nemark là đơn vị cung cấp giải pháp số toàn diện cho doanh nghiệp, 
              bao gồm: thiết kế website, phát triển phần mềm theo yêu cầu, AI automation 
              và hệ thống hosting/vps chuyên nghiệp. Chúng tôi mang đến những sản phẩm 
              hiện đại, tối ưu trải nghiệm người dùng và hỗ trợ doanh nghiệp chuyển đổi số hiệu quả.
            </p>

            <ul className="list-none p-0 m-0">
              <li className="flex items-start mt-10">
                <DeploymentUnitOutlined className="text-5xl text-blue-500 mr-5 shrink-0" />
                <div>
                  <h5 className="text-lg font-bold mb-2 text-gray-800">Thiết Kế Website & Giải Pháp Thương Hiệu</h5>
                  <p className="text-sm">
                    Website chuẩn SEO, giao diện hiện đại, tốc độ cao và tối ưu chuyển đổi — 
                    phù hợp mọi ngành nghề và mô hình kinh doanh.
                  </p>
                </div>
              </li>

              <li className="flex items-start mt-10">
                <CodeOutlined className="text-5xl text-blue-500 mr-5 shrink-0" />
                <div>
                  <h5 className="text-lg font-bold mb-2 text-gray-800">Phần Mềm, Ứng Dụng & Tự Động Hóa</h5>
                  <p className="text-sm">
                    Phát triển phần mềm theo yêu cầu (CRM, ERP, quản lý bán hàng), 
                    tích hợp AI và tự động hóa quy trình giúp doanh nghiệp nâng cao hiệu suất.
                  </p>
                </div>
              </li>

              <li className="flex items-start mt-10">
                <CloudServerOutlined className="text-5xl text-blue-500 mr-5 shrink-0" />
                <div>
                  <h5 className="text-lg font-bold mb-2 text-gray-800">Hạ Tầng Hosting – Server – Bảo Mật</h5>
                  <p className="text-sm">
                    Cung cấp hosting/VPS tốc độ cao, ổn định, bảo mật mạnh mẽ, backup mỗi ngày 
                    và hỗ trợ kỹ thuật 24/7 nhằm đảm bảo hệ thống vận hành liên tục.
                  </p>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
        centered
        destroyOnClose
        bodyStyle={{ padding: 0, height: '450px' }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/z2EYAGlwBB0?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </section>
  )
}

export default About
