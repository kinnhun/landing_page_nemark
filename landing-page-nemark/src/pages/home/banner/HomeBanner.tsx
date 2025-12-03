import React from 'react'
import Image from 'next/image';
import heroBg from '../../../../public/assets/img/hero-bg.jpg';

const HomeBanner = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center py-20 bg-[#2f3942] text-white overflow-hidden">
      <Image 
        src={heroBg} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover z-0"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="flex justify-center">
          <div className="lg:w-3/4">
            <h2 className="text-5xl font-bold mb-4 text-white">Giải Pháp Số Toàn Diện Cho Doanh Nghiệp</h2>
            <p className="text-2xl mb-8 text-white">
              Nemark cung cấp dịch vụ thiết kế website, phát triển phần mềm, AI automation 
              và hệ thống hosting/vps giúp doanh nghiệp tối ưu vận hành & tăng trưởng doanh số.
            </p>
            <a 
              href="#about" 
              className="inline-block px-10 py-2 border-2 border-white/50 text-white text-base tracking-wider rounded hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-500"
            >
              Khám Phá Ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
