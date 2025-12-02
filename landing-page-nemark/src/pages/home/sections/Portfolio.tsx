import React, { useState } from 'react'
import Image from 'next/image';
import { EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { Image as AntImage } from 'antd';

const Portfolio = () => {
  const [filter, setFilter] = useState('*');
  const [previewImage, setPreviewImage] = useState('');

  const categories = [
    { key: '*', label: 'Tất Cả' },
    { key: 'app', label: 'Ứng Dụng' },
    { key: 'product', label: 'Sản Phẩm' },
    { key: 'branding', label: 'Thương Hiệu' },
    { key: 'books', label: 'Tài Liệu / Ấn Phẩm' },
  ];

  const items = [
    { id: 1, category: 'app', title: 'Ứng Dụng Quản Lý', desc: 'Giải pháp quản lý bán hàng & vận hành dành cho doanh nghiệp SMEs.', img: '/assets/img/portfolio/app-1.jpg' },
    { id: 2, category: 'product', title: 'Website Thương Mại', desc: 'Hệ thống website bán hàng tối ưu SEO & trải nghiệm người dùng.', img: '/assets/img/portfolio/product-1.jpg' },
    { id: 3, category: 'branding', title: 'Thiết Kế Thương Hiệu', desc: 'Bộ nhận diện doanh nghiệp đồng bộ và hiện đại.', img: '/assets/img/portfolio/branding-1.jpg' },
    { id: 4, category: 'books', title: 'Tài Liệu Sản Phẩm', desc: 'Tài liệu hướng dẫn & ấn phẩm giới thiệu giải pháp công nghệ.', img: '/assets/img/portfolio/books-1.jpg' },
    { id: 5, category: 'app', title: 'Ứng Dụng Mobile', desc: 'Ứng dụng chăm sóc khách hàng & đặt lịch dịch vụ cho doanh nghiệp.', img: '/assets/img/portfolio/app-2.jpg' },
    { id: 6, category: 'product', title: 'Website Dịch Vụ', desc: 'Giải pháp website đặt lịch và bán dịch vụ chuyên nghiệp.', img: '/assets/img/portfolio/product-2.jpg' },
    { id: 7, category: 'branding', title: 'Logo & Bộ Nhận Diện', desc: 'Xây dựng hình ảnh thương hiệu theo phong cách hiện đại.', img: '/assets/img/portfolio/branding-2.jpg' },
    { id: 8, category: 'books', title: 'Ấn Phẩm Số', desc: 'Thiết kế tài liệu digital phục vụ quảng cáo & truyền thông.', img: '/assets/img/portfolio/books-2.jpg' },
    { id: 9, category: 'app', title: 'Ứng Dụng Doanh Nghiệp', desc: 'Giải pháp tối ưu vận hành & quản lý nội bộ cho doanh nghiệp.', img: '/assets/img/portfolio/app-3.jpg' },
    { id: 10, category: 'product', title: 'Website Doanh Nghiệp', desc: 'Website giới thiệu công ty chuẩn SEO, giao diện chuyên nghiệp.', img: '/assets/img/portfolio/product-3.jpg' },
    { id: 11, category: 'branding', title: 'Thiết Kế Bộ Nhận Diện', desc: 'Thiết kế đồng bộ hình ảnh, nâng tầm thương hiệu doanh nghiệp.', img: '/assets/img/portfolio/branding-3.jpg' },
    { id: 12, category: 'books', title: 'Tài Liệu Doanh Nghiệp', desc: 'Tài liệu, infographic và báo cáo trình bày hiện đại.', img: '/assets/img/portfolio/books-3.jpg' },
  ];

  const filteredItems = filter === '*' ? items : items.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-16 bg-white scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">Dự Án Tiêu Biểu</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Các dự án Nemark đã triển khai, bao gồm website doanh nghiệp, ứng dụng, phần mềm
          quản lý, hệ thống thương mại điện tử và các giải pháp thương hiệu số.
        </p>
      </div>

      <div className="container mx-auto px-4">
        
        {/* BỘ LỌC */}
        <div className="flex justify-center mb-8">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 list-none p-0 m-0 bg-white rounded-full shadow-sm border border-gray-100 py-2 px-4">
            {categories.map(cat => (
              <li 
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`cursor-pointer px-4 py-2 text-sm font-medium uppercase transition-all duration-300 rounded-full ${
                  filter === cat.key 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>

        {/* DANH SÁCH DỰ ÁN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
              <div className="relative overflow-hidden aspect-4/3">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button 
                    onClick={() => setPreviewImage(item.img)}
                    className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-blue-500 transition-colors duration-300 border-none cursor-pointer"
                  >
                    <EyeOutlined className="text-lg" />
                  </button>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-blue-500 transition-colors duration-300">
                    <LinkOutlined className="text-lg" />
                  </a>
                </div>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Hidden Image for Preview */}
      <div style={{ display: 'none' }}>
        <AntImage
          preview={{
            visible: !!previewImage,
            onVisibleChange: (visible) => {
                if (!visible) setPreviewImage('');
            },
            src: previewImage,
          }}
        />
      </div>

    </section>
  )
}

export default Portfolio
