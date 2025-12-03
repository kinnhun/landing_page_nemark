import React from 'react'
import Image from 'next/image';
import ctaBg from '../../../../public/assets/img/cta-bg.jpg';
import { Reveal } from '@/components/Reveal';

const CallToAction = () => {
  return (
    <section id="call-to-action" className="relative py-20 bg-linear-to-r from-blue-600 to-teal-500 text-white overflow-hidden scroll-mt-20">
      <Image 
        src={ctaBg} 
        alt="Call To Action" 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 mix-blend-overlay"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <Reveal width="100%">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8">

            <div className="text-center xl:text-left xl:w-3/4">
              <h3 className="text-3xl font-bold mb-4 text-white">Đồng Hành Cùng Nemark Trong Hành Trình Chuyển Đổi Số</h3>
              <p className="text-lg text-white/90">
                Bạn đang cần một website chuyên nghiệp, phần mềm quản lý linh hoạt 
                hay giải pháp AI tự động hóa quy trình? Nemark sẵn sàng hỗ trợ và 
                xây dựng giải pháp phù hợp nhất cho doanh nghiệp của bạn.
              </p>
            </div>

            <div className="xl:w-1/4 text-center">
              <a 
                className="inline-block px-10 py-3 bg-white text-blue-600 text-base font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 hover:shadow-lg transition-all duration-300" 
                href="#contact"
              >
                Liên Hệ Ngay
              </a>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CallToAction
