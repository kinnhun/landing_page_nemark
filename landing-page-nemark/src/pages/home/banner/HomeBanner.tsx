import React from 'react'
import Image from 'next/image';
import heroBg from '../../../../public/assets/img/hero-bg.jpg';
import { motion } from 'framer-motion';

const HomeBanner = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center py-20 bg-white text-white overflow-hidden">
      <Image 
        src={heroBg} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover z-0"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 to-teal-800/80 z-10"></div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="flex justify-center">
          <div className="lg:w-3/4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold mb-4 text-white"
            >
              Giải Pháp Số Toàn Diện Cho Doanh Nghiệp
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl mb-8 text-gray-100"
            >
              Nemark cung cấp dịch vụ thiết kế website, phát triển phần mềm, AI automation 
              và hệ thống hosting/vps giúp doanh nghiệp tối ưu vận hành & tăng trưởng doanh số.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="#about"
                className="glow-outline inline-block px-10 py-3 border-2 border-white text-white text-base font-medium tracking-wider rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
              >
                Khám Phá Ngay
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
