import React, { useState, useEffect, useCallback } from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { getPricingSettings } from '@/services/pricingApi';
import type { PricingSettings, PricingPackage } from '@/types/pricing';

const Pricing = () => {
  const [settings, setSettings] = useState<PricingSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPricingData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPricingSettings();
      setSettings(data);
    } catch (err) {
      console.error('Error fetching pricing settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPricingData();

    // Listen for pricing settings updates
    const handleUpdate = () => {
      fetchPricingData();
    };

    // Listen to localStorage event
    window.addEventListener('pricing_settings_updated', handleUpdate);

    // Listen to BroadcastChannel
    const channel = new BroadcastChannel('app_settings_channel');
    channel.addEventListener('message', (event) => {
      if (event.data === 'pricing-updated') {
        fetchPricingData();
      }
    });

    return () => {
      window.removeEventListener('pricing_settings_updated', handleUpdate);
      channel.close();
    };
  }, [fetchPricingData]);

  // Don't render if hidden or loading
  if (loading) {
    return (
      <section id="pricing" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-500">Đang tải...</div>
        </div>
      </section>
    );
  }

  if (!settings || settings.visible === false) {
    return null;
  }

  const packages = (settings.packages || []).filter(pkg => pkg.enabled !== false);

  // Get grid columns class
  const getGridCols = () => {
    const cols = settings.columns || 3;
    if (cols === 1) return 'grid-cols-1';
    if (cols === 2) return 'grid-cols-1 md:grid-cols-2';
    if (cols === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    return 'grid-cols-1 md:grid-cols-3'; // default 3
  };

  // Format price
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <section id="pricing" className="py-16 bg-gray-50 scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-12 flex flex-col items-center">
        <Reveal direction="up">
          <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">{settings.title || 'Bảng Giá Dịch Vụ'}</h2>
          {settings.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {settings.description}
            </p>
          )}
        </Reveal>
      </div>

      <div className="container mx-auto px-4">
        {packages.length > 0 ? (
          <StaggerContainer className={`grid ${getGridCols()} gap-8`} style={{ alignItems: 'stretch' }}>
            {packages.map((pkg: PricingPackage) => (
              <StaggerItem 
                key={pkg.id} 
                className="h-full"
                style={{ 
                  display: 'flex',
                  ...(pkg.popular && pkg.scale ? { 
                    transform: `scale(${pkg.scale})`,
                    zIndex: 10,
                    position: 'relative'
                  } : {})
                }}
              >
                <div 
                  className={`bg-white p-8 rounded-lg flex flex-col h-full w-full transition-all duration-300 ${
                    pkg.popular 
                      ? 'shadow-xl border-2' 
                      : 'shadow-sm border border-gray-100 hover:shadow-lg'
                  }`}
                  style={{
                    borderColor: pkg.popular ? (pkg.borderColor || '#2563eb') : undefined,
                    minHeight: '100%',
                  }}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-linear-to-r from-blue-600 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase z-20">
                      Phổ Biến
                    </div>
                  )}
                  
                  <div style={{ marginTop: pkg.popular ? 20 : 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                    <p className="text-sm text-gray-600 mb-6 flex-shrink-0">
                      {pkg.description}
                    </p>
                    
                    <div className={`text-4xl font-bold mb-6 flex-shrink-0 ${
                      pkg.popular 
                        ? 'bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-teal-500' 
                        : 'text-blue-500'
                    }`}>
                      <sup className={pkg.popular ? 'text-xl text-blue-500' : 'text-xl'}>
                        {pkg.currency || '₫'}
                      </sup>
                      {formatPrice(pkg.price)}
                      <span className="text-base font-normal text-gray-500">
                        {pkg.priceUnit || ' / tháng'}
                      </span>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <a 
                        href={pkg.buttonLink || '#contact'}
                        className={`block w-full py-3 text-center rounded transition-all duration-300 font-medium mb-2 ${
                          pkg.popular
                            ? 'bg-linear-to-r from-blue-600 to-teal-500 text-white hover:shadow-lg hover:scale-105'
                            : 'border border-blue-500 text-blue-500 hover:bg-linear-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white hover:border-transparent'
                        }`}
                      >
                        {pkg.buttonText}
                      </a>
                      
                      {pkg.buttonSubtext && (
                        <p className="text-center text-xs text-gray-500 mb-8">
                          {pkg.buttonSubtext}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-4 flex-1 mt-auto">
                      {(pkg.features || []).map((feature, idx) => (
                        <li 
                          key={feature.id || idx}
                          className={`flex items-start text-sm ${
                            feature.included 
                              ? 'text-gray-600' 
                              : 'text-gray-400 line-through'
                          }`}
                        >
                          <span className="flex-shrink-0 mr-3 mt-0.5">
                            {feature.included ? (
                              <CheckOutlined className="text-green-500" />
                            ) : (
                              <CloseOutlined className="text-gray-300" />
                            )}
                          </span>
                          <span className="flex-1">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Chưa có gói dịch vụ nào để hiển thị
          </div>
        )}
      </div>

    </section>
  )
}

export default Pricing
