import React from 'react'
import Image from 'next/image';
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const Team = () => {
  return (
    <section id="team" className="py-16 bg-white scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">Đội Ngũ Nemark</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Những chuyên gia giàu kinh nghiệm trong lĩnh vực thiết kế website, phần mềm, 
          AI automation và giải pháp số, luôn sẵn sàng đồng hành cùng doanh nghiệp.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* CEO */}
          <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col sm:flex-row items-start gap-6 border border-gray-100 hover:shadow-md transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="w-32 h-32 relative shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image src="/assets/img/team/team-1.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-800 mb-1">Nguyễn Minh Khôi</h4>
              <span className="text-sm text-blue-500 font-medium block mb-3">Giám Đốc Điều Hành</span>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Người sáng lập Nemark với tầm nhìn xây dựng hệ sinh thái giải pháp số 
                giúp doanh nghiệp phát triển bền vững trong thời đại công nghệ.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><TwitterOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><FacebookOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><InstagramOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><LinkedinOutlined className="text-lg" /></a>
              </div>
            </div>
          </div>

          {/* Product Manager */}
          <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col sm:flex-row items-start gap-6 border border-gray-100 hover:shadow-md transition-shadow duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="w-32 h-32 relative shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image src="/assets/img/team/team-2.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-800 mb-1">Trần Thu Hà</h4>
              <span className="text-sm text-blue-500 font-medium block mb-3">Quản Lý Sản Phẩm</span>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Chịu trách nhiệm xây dựng và hoạch định sản phẩm website – phần mềm, 
                đảm bảo trải nghiệm người dùng mượt mà và hiệu quả.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><TwitterOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><FacebookOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><InstagramOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><LinkedinOutlined className="text-lg" /></a>
              </div>
            </div>
          </div>

          {/* CTO */}
          <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col sm:flex-row items-start gap-6 border border-gray-100 hover:shadow-md transition-shadow duration-300" data-aos="fade-up" data-aos-delay="300">
            <div className="w-32 h-32 relative shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image src="/assets/img/team/team-3.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-800 mb-1">Phạm Hoàng Long</h4>
              <span className="text-sm text-blue-500 font-medium block mb-3">Giám Đốc Công Nghệ</span>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Chuyên gia giải pháp AI, tự động hóa và hệ thống phần mềm với hơn 10 năm 
                kinh nghiệm phát triển các nền tảng công nghệ phức tạp.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><TwitterOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><FacebookOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><InstagramOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><LinkedinOutlined className="text-lg" /></a>
              </div>
            </div>
          </div>

          {/* Kế toán / Vận hành */}
          <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col sm:flex-row items-start gap-6 border border-gray-100 hover:shadow-md transition-shadow duration-300" data-aos="fade-up" data-aos-delay="400">
            <div className="w-32 h-32 relative shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image src="/assets/img/team/team-4.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-800 mb-1">Lê Mai Anh</h4>
              <span className="text-sm text-blue-500 font-medium block mb-3">Trưởng Phòng Vận Hành</span>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Đảm bảo quy trình làm việc hiệu quả, quản lý dự án và chăm sóc khách hàng 
                giúp Nemark duy trì chất lượng dịch vụ cao nhất.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><TwitterOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><FacebookOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><InstagramOutlined className="text-lg" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><LinkedinOutlined className="text-lg" /></a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Team
