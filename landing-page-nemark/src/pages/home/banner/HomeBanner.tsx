import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { getBannerSettings } from '../../../services/bannerApi';
import type { BannerSettings } from '../../../types/banner';

const HomeBanner = () => {
  const [settings, setSettings] = useState<BannerSettings | null>(null);

  useEffect(() => {
    getBannerSettings().then(data => {
      if (data) setSettings(data);
    });
  }, []);

  // Listen for updates broadcast from admin settings page
  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const ce = e as CustomEvent<BannerSettings>;
        if (ce?.detail) setSettings(ce.detail);
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('bannerSettingsUpdated', handler as EventListener);

    // Listen for cross-tab updates
    const channel = new BroadcastChannel('app_settings_channel');
    channel.onmessage = (event) => {
      if (event.data === 'banner-updated') {
        getBannerSettings().then(data => {
          if (data) setSettings(data);
        });
      }
    };

    return () => {
      window.removeEventListener('bannerSettingsUpdated', handler as EventListener);
      channel.close();
    };
  }, []);

  if (!settings) return null; // Or a loading skeleton

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center py-20 bg-white text-white overflow-hidden">
      {/* Background Image (single layer via CSS to avoid double-render) */}
      {settings.backgroundImage && (
        <div
          className="absolute inset-0 w-full h-full z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${settings.backgroundImage})` }}
        />
      )}
      
      {/* Overlay */}
      {settings.overlay.enabled && (
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to right, ${settings.overlay.fromColor}, ${settings.overlay.toColor})`,
            opacity: settings.overlay.opacity
          }}
        ></div>
      )}

      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="flex justify-center">
          <div className="lg:w-3/4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold mb-4 text-white"
            >
              {settings.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl mb-8 text-gray-100"
            >
              {settings.description}
            </motion.p>
            
            {settings.cta.visible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <a
                  href={settings.cta.link}
                  className="glow-outline inline-block px-10 py-3 border-2 border-white text-white text-base font-medium tracking-wider rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
                >
                  {settings.cta.label}
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
