import React, { useEffect, useState } from 'react'
import * as Icons from '@ant-design/icons';
import { StaggerContainer, StaggerItem, Reveal } from '@/components/Reveal';
import { getServicesSettings } from '@/services/servicesApi';
import type { ServicesSettings } from '@/types/services';

const Services = () => {
  const [settings, setSettings] = useState<ServicesSettings | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getServicesSettings();
        setSettings(data);
        setKey(prev => prev + 1);
      } catch (error) {
        console.error('Failed to fetch services settings:', error);
      }
    };

    fetchSettings();

    // Listen for updates
    const channel = new BroadcastChannel('app-settings');
    channel.onmessage = (event) => {
      if (event.data.type === 'services-updated') {
        setSettings(event.data.data);
        setKey(prev => prev + 1);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  if (!settings || !settings.items || settings.items.length === 0) return null;

  return (
    <section key={key} id="services" className="py-16 bg-white scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-16 flex flex-col items-center">
        <Reveal direction="up">
          <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">{settings.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {settings.description}
          </p>
        </Reveal>
      </div>

      <div className="container mx-auto px-4">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {settings.items.map((item, index) => {
            // Dynamically get icon component
            const IconComponent = (Icons as any)[item.icon] || Icons.QuestionOutlined;

            return (
              <StaggerItem key={index} className="group">
                <div className="relative bg-white p-8 pt-12 border border-gray-200 text-center transition-all duration-300 hover:bg-white hover:border-teal-400 hover:-translate-y-2 hover:shadow-xl rounded-lg">
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 bg-linear-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl border-6 border-white transition-all duration-300 group-hover:scale-110 shadow-md">
                    <IconComponent />
                  </div>
                  <a href={item.link} className="block mt-4 mb-4 cursor-pointer">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                  </a>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}

        </StaggerContainer>
      </div>
    </section>
  )
}

export default Services
