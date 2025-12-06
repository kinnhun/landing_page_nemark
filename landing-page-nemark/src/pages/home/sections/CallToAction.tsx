import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import ctaBg from '../../../../public/assets/img/cta-bg.jpg';
import { Reveal } from '@/components/Reveal';
import { getCtaSettings } from '@/services/ctaApi';
import type { CtaSettings } from '@/types/cta';

const CallToAction = () => {
  const [settings, setSettings] = useState<CtaSettings | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getCtaSettings();
        setSettings(data);
        setKey(prev => prev + 1);
      } catch (error) {
        console.error('Failed to fetch CTA settings:', error);
      }
    };

    fetchSettings();

    // Listen for updates
    const channel = new BroadcastChannel('app-settings');
    channel.onmessage = (event) => {
      if (event.data.type === 'cta-updated') {
        setSettings(event.data.data);
        setKey(prev => prev + 1);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  if (!settings) return null;

  const backgroundStyle: React.CSSProperties = {
    background: settings.background.type === 'gradient'
      ? `linear-gradient(to right, ${settings.background.gradientFrom}, ${settings.background.gradientTo})`
      : settings.background.gradientFrom,
    opacity: settings.background.opacity
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: settings.button.backgroundColor,
    color: settings.button.textColor,
  };

  return (
    <section 
      key={key}
      id="call-to-action" 
      className="relative py-20 text-white overflow-hidden scroll-mt-20"
      style={backgroundStyle}
    >
      {settings.backgroundImage && (
        <Image 
          src={settings.backgroundImage} 
          alt="Call To Action" 
          width={1920}
          height={600}
          className="absolute inset-0 w-full h-full object-cover z-0 mix-blend-overlay"
          style={{ opacity: settings.overlay.enabled ? settings.overlay.opacity : 0 }}
        />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <Reveal width="100%">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8">

            <div className="text-center xl:text-left xl:w-3/4">
              <h3 className="text-3xl font-bold mb-4 text-white">{settings.title}</h3>
              <p className="text-lg text-white/90">
                {settings.description}
              </p>
            </div>

            {settings.button.visible && (
              <div className="xl:w-1/4 text-center">
                <a 
                  className="cta-button inline-block px-10 py-3 text-base font-bold uppercase tracking-wider rounded-full transition-all duration-300" 
                  href={settings.button.link}
                  style={buttonStyle}
                >
                  {settings.button.label}
                </a>
                <style jsx>{`
                  .cta-button:hover {
                    background-color: ${settings.button.hoverBackgroundColor} !important;
                    color: ${settings.button.hoverTextColor} !important;
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                  }
                `}</style>
              </div>
            )}

          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CallToAction
