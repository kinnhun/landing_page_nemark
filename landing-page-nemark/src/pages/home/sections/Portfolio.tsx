import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { Image as AntImage } from 'antd';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { getPortfolioSettings } from '@/services/portfolioApi';
import type { PortfolioSettings } from '@/types/portfolio';

const Portfolio = () => {
  const [filter, setFilter] = useState('*');
  const [previewImage, setPreviewImage] = useState('');
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPortfolioData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPortfolioSettings();
      setSettings(data);
    } catch (err) {
      console.error('Error fetching portfolio settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolioData();

    // Listen for portfolio settings updates
    const handleUpdate = () => {
      fetchPortfolioData();
    };

    // Listen to localStorage event
    window.addEventListener('portfolio_settings_updated', handleUpdate);

    // Listen to BroadcastChannel
    const channel = new BroadcastChannel('app_settings_channel');
    channel.addEventListener('message', (event) => {
      if (event.data === 'portfolio-updated') {
        fetchPortfolioData();
      }
    });

    return () => {
      window.removeEventListener('portfolio_settings_updated', handleUpdate);
      channel.close();
    };
  }, [fetchPortfolioData]);

  // Don't render if hidden or loading
  if (loading) {
    return (
      <section id="portfolio" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-500">Đang tải...</div>
        </div>
      </section>
    );
  }

  if (!settings || settings.visible === false) {
    return null;
  }

  const categories = settings.categories || [
    { key: '*', label: 'Tất Cả' },
    { key: 'app', label: 'Ứng Dụng' },
    { key: 'product', label: 'Sản Phẩm' },
    { key: 'branding', label: 'Thương Hiệu' },
    { key: 'books', label: 'Tài Liệu / Ấn Phẩm' },
  ];

  const items = (settings.items || []).filter(item => item.enabled !== false);
  const filteredItems = filter === '*' ? items : items.filter(item => item.category === filter);

  // Get grid columns class
  const getGridCols = () => {
    const cols = settings.columns || 3;
    if (cols === 1) return 'grid-cols-1';
    if (cols === 2) return 'grid-cols-1 md:grid-cols-2';
    if (cols === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // default 3
  };

  return (
    <section id="portfolio" className="py-16 bg-white scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-12 flex flex-col items-center">
        <Reveal direction="up">
          <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">{settings.title || 'Dự Án Tiêu Biểu'}</h2>
          {settings.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {settings.description}
            </p>
          )}
        </Reveal>
      </div>

      <div className="container mx-auto px-4">
        
        {/* BỘ LỌC */}
        {settings.showFilter !== false && (
          <div className="flex justify-center mb-8">
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 list-none p-0 m-0 bg-white rounded-full shadow-sm border border-gray-100 py-2 px-4">
              {categories.map(cat => (
                <li 
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium uppercase transition-all duration-300 rounded-full ${
                    filter === cat.key 
                      ? 'bg-linear-to-r from-blue-600 to-teal-500 text-white shadow-md' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* DANH SÁCH DỰ ÁN */}
        {filteredItems.length > 0 ? (
          <StaggerContainer key={filter} className={`grid ${getGridCols()} gap-8`}>
            {filteredItems.map(item => {
              // Handle image source - can be string URL or imported image
              const imageSrc = typeof item.img === 'string' 
                ? item.img 
                : (typeof item.img === 'object' && item.img !== null && 'src' in item.img)
                  ? (item.img as { src: string }).src
                  : '';
              
              return (
                <StaggerItem key={item.id} className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
                  <div className="relative overflow-hidden aspect-4/3">
                    {imageSrc ? (
                      <Image 
                        src={imageSrc} 
                        alt={item.title} 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button 
                        onClick={() => setPreviewImage(imageSrc)}
                        className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-linear-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300 border-none cursor-pointer"
                      >
                        <EyeOutlined className="text-lg" />
                      </button>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          target={item.link.startsWith('#') ? undefined : '_blank'}
                          rel={item.link.startsWith('#') ? undefined : 'noopener noreferrer'}
                          className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-linear-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300"
                        >
                          <LinkOutlined className="text-lg" />
                        </a>
                      ) : (
                        <a 
                          href={imageSrc} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-linear-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300"
                        >
                          <LinkOutlined className="text-lg" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Chưa có dự án nào để hiển thị
          </div>
        )}

      </div>

      {/* Hidden Image for Preview */}
      {previewImage && (
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
      )}

    </section>
  )
}

export default Portfolio
