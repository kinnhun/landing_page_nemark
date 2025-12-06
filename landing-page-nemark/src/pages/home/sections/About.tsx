import React, { useState, useEffect } from 'react'
import * as Icons from '@ant-design/icons';
import { Modal } from 'antd';
import { Reveal } from '@/components/Reveal';
import { getAboutSettings } from '../../../services/aboutApi';
import type { AboutSettings } from '../../../types/about';

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState<AboutSettings | null>(null);

  useEffect(() => {
    getAboutSettings().then(data => {
      if (data) setSettings(data);
    });

    // Listen for updates
    const handler = (e: Event) => {
      try {
        const ce = e as CustomEvent<AboutSettings>;
        if (ce?.detail) setSettings(ce.detail);
      } catch {
        // ignore
      }
    };

    window.addEventListener('aboutSettingsUpdated', handler as EventListener);

    const channel = new BroadcastChannel('app_settings_channel');
    channel.onmessage = (event) => {
      if (event.data === 'about-updated') {
        getAboutSettings().then(data => {
          if (data) setSettings(data);
        });
      }
    };

    return () => {
      window.removeEventListener('aboutSettingsUpdated', handler as EventListener);
      channel.close();
    };
  }, []);

  if (!settings) return null;

  // Helper to render icon dynamically
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="text-3xl text-blue-500 group-hover:text-white transition-colors duration-300" /> : null;
  };

  return (
    <section id="about" className="py-16 bg-white text-gray-600 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Hình ảnh + Video */}
          <div className="lg:w-1/2 relative flex items-center lg:order-last">
            <Reveal direction="left" width="100%">
              <div className="relative">
                <img 
                  src={settings.image} 
                  className="w-full h-auto block rounded shadow-lg" 
                  alt="About Image" 
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <a 
                        onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                        href="#"
                        className="relative inline-flex rounded-full h-24 w-24 bg-linear-to-r from-blue-600 to-teal-500 items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl"
                    >
                        <span className="w-0 h-0 border-t-10 border-t-transparent border-b-10 border-b-transparent border-l-15 border-l-white ml-1"></span>
                    </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Nội dung giới thiệu */}
          <div className="lg:w-1/2">
            <Reveal direction="right">
              <h3 className="text-3xl font-bold mb-4 text-gray-800">{settings.title}</h3>
              <p className="mb-6 text-lg leading-relaxed">
                {settings.description}
              </p>

              <ul className="list-none p-0 m-0">
                {settings.features.map((feature, index) => (
                  <li key={index} className="flex items-start mt-8 group">
                    <div className="p-3 rounded-full bg-blue-50 mr-5 group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">
                      {renderIcon(feature.icon)}
                    </div>
                    <div>
                      <h5 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h5>
                      <p className="text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
        centered
        destroyOnClose
        bodyStyle={{ padding: 0, height: '450px' }}
      >
        <iframe
          width="100%"
          height="100%"
          src={settings.videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </section>
  )
}

export default About
