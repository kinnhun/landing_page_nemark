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
  const [displayedRows, setDisplayedRows] = useState(3); // Số dòng hiển thị ban đầu

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

  // Reset displayed rows when filter changes
  useEffect(() => {
    setDisplayedRows(3);
  }, [filter]);

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

  // Get number of columns from settings
  const columns = settings.columns || 3;
  
  // Calculate items per row based on columns
  // For responsive: on mobile always 1, on tablet/mobile use responsive cols
  const getItemsPerRow = () => {
    // This will be used to calculate how many items = 1 row
    // On desktop: use columns setting
    // On mobile/tablet: responsive grid handles it
    return columns;
  };

  const itemsPerRow = getItemsPerRow();
  const itemsPerPage = displayedRows * itemsPerRow; // Số items = số dòng * số cột

  // Items to display (limited by rows)
  const itemsToDisplay = filteredItems.slice(0, itemsPerPage);
  const hasMore = itemsPerPage < filteredItems.length;

  // Calculate remaining rows
  const remainingItems = Math.max(0, filteredItems.length - itemsPerPage);
  const remainingRows = remainingItems > 0 ? Math.ceil(remainingItems / itemsPerRow) : 0;

  // Handle load more - add 3 more rows
  const handleLoadMore = () => {
    setDisplayedRows(prev => {
      const newRows = prev + 3;
      // Ensure we don't exceed total items
      const maxRows = Math.ceil(filteredItems.length / itemsPerRow);
      return Math.min(newRows, maxRows);
    });
  };

  // Debug log (remove in production)
  // console.log('Portfolio Debug:', {
  //   columns,
  //   itemsPerRow,
  //   displayedRows,
  //   itemsPerPage,
  //   filteredItemsLength: filteredItems.length,
  //   itemsToDisplayLength: itemsToDisplay.length,
  //   hasMore
  // });

  // Get grid columns class
  const getGridCols = () => {
    if (columns === 1) return 'grid-cols-1';
    if (columns === 2) return 'grid-cols-1 md:grid-cols-2';
    if (columns === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
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
          <>
            <StaggerContainer key={`${filter}-${itemsPerPage}`} className={`grid ${getGridCols()} gap-8`}>
              {itemsToDisplay.map(item => {
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

            {/* NÚT XEM THÊM */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-linear-to-r from-blue-600 to-teal-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Xem Thêm {remainingRows} Dòng ({remainingItems} dự án)
                </button>
              </div>
            )}
          </>
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
