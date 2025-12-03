import React from 'react'
import Counter from '@/components/Counter'
import { StaggerContainer, StaggerItem } from '@/components/Reveal'

const Stats = () => {
  return (
    <section id="stats" className="py-16 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Khách hàng */}
          <StaggerItem className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
              <Counter end={232} />
            </div>
            <p className="text-gray-600 font-semibold m-0">Khách Hàng Tin Dùng</p>
          </StaggerItem>

          {/* Dự án */}
          <StaggerItem className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
              <Counter end={521} />
            </div>
            <p className="text-gray-600 font-semibold m-0">Dự Án Hoàn Thành</p>
          </StaggerItem>

          {/* Giờ hỗ trợ */}
          <StaggerItem className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
              <Counter end={1453} />
            </div>
            <p className="text-gray-600 font-semibold m-0">Giờ Hỗ Trợ Kỹ Thuật</p>
          </StaggerItem>

          {/* Nhân sự */}
          <StaggerItem className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
              <Counter end={32} />
            </div>
            <p className="text-gray-600 font-semibold m-0">Thành Viên Đội Ngũ</p>
          </StaggerItem>

        </StaggerContainer>

      </div>
    </section>
  )
}

export default Stats
