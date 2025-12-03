import React from 'react'
import Image from 'next/image';
import ctaBg from '../../../../public/assets/img/cta-bg.jpg';

const CallToAction = () => {
  return (
    <section id="call-to-action" className="relative py-20 bg-[#2f3942] text-white overflow-hidden scroll-mt-20">
      <Image 
        src={ctaBg} 
        alt="Call To Action" 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8" data-aos="zoom-in" data-aos-delay="100">

          <div className="text-center xl:text-left xl:w-3/4">
            <h3 className="text-3xl font-bold mb-4 text-white">Đồng Hành Cùng Nemark Trong Hành Trình Chuyển Đổi Số</h3>
            <p className="text-lg text-gray-200">
              Bạn đang cần một website chuyên nghiệp, phần mềm quản lý linh hoạt 
              hay giải pháp AI tự động hóa quy trình? Nemark sẵn sàng hỗ trợ và 
              xây dựng giải pháp phù hợp nhất cho doanh nghiệp của bạn.
            </p>
          </div>

          <div className="xl:w-1/4 text-center">
            <a 
              className="inline-block px-10 py-3 border-2 border-white text-white text-base font-medium uppercase tracking-wider rounded hover:bg-blue-500 hover:border-blue-500 transition-all duration-300" 
              href="#contact"
            >
              Liên Hệ Ngay
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CallToAction
