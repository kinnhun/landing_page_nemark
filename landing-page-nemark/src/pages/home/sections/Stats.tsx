import React from 'react'
import Counter from '@/components/Counter'

const Stats = () => {
  return (
    <section id="stats" className="py-16 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Khách hàng */}
          <div className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg">
            <Counter end={232} className="text-5xl font-bold text-blue-500 block mb-2" />
            <p className="text-gray-600 font-semibold m-0">Khách Hàng Tin Dùng</p>
          </div>

          {/* Dự án */}
          <div className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg">
            <Counter end={521} className="text-5xl font-bold text-blue-500 block mb-2" />
            <p className="text-gray-600 font-semibold m-0">Dự Án Hoàn Thành</p>
          </div>

          {/* Giờ hỗ trợ */}
          <div className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg">
            <Counter end={1453} className="text-5xl font-bold text-blue-500 block mb-2" />
            <p className="text-gray-600 font-semibold m-0">Giờ Hỗ Trợ Kỹ Thuật</p>
          </div>

          {/* Nhân sự */}
          <div className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg">
            <Counter end={32} className="text-5xl font-bold text-blue-500 block mb-2" />
            <p className="text-gray-600 font-semibold m-0">Thành Viên Đội Ngũ</p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Stats
