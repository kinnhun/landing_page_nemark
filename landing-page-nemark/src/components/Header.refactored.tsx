/**
 * Refactored Header component using React Query
 * This is an example of how to use the new structure
 */

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Drawer, Dropdown, Space } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { MenuItem, HeaderSettings } from '../types/header';
import { useHeaderSettings } from '../hooks/api';
import { LoadingSpinner } from './shared';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);

  // Use React Query hook instead of manual fetch
  const { data: settings, isLoading, error } = useHeaderSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      const sections = ['hero', 'about', 'services', 'portfolio', 'team', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for settings updates
  useEffect(() => {
    const channel = new BroadcastChannel('app_settings_channel');
    channel.onmessage = (event) => {
      if (event.data === 'header-updated') {
        // React Query will automatically refetch
      }
    };
    return () => channel.close();
  }, []);

  if (isLoading) {
    return <LoadingSpinner size="small" />;
  }

  if (error) {
    console.error('Error loading header settings:', error);
  }

  const menuItemsFromSettings: MenuItem[] = settings?.menu?.items ?? [
    { id: 'hero', label: 'Trang Chủ', link: '#hero', enabled: true },
    { id: 'about', label: 'Giới Thiệu', link: '#about', enabled: true },
    { id: 'services', label: 'Dịch Vụ', link: '#services', enabled: true },
    { id: 'portfolio', label: 'Dự Án', link: '#portfolio', enabled: true },
    { id: 'team', label: 'Đội Ngũ', link: '#team', enabled: true }
  ];

  const navLinks = menuItemsFromSettings.filter((i: MenuItem) => i.enabled !== false);

  const dropdownItemsFor = (children: MenuItem[] | undefined): MenuProps['items'] => {
    if (!children || !children.length) return [];
    return children.map((c: MenuItem) => ({ 
      key: c.id, 
      label: <a href={c.link || '#'}>{c.label}</a>, 
      children: c.children ? dropdownItemsFor(c.children) : undefined 
    }));
  };

  const defaultTextColor = settings?.text?.defaultColor ?? (scrolled ? '#1f2937' : '#ffffff');
  const hoverColor = settings?.text?.hoverColor ?? (scrolled ? '#2563eb' : '#7dd3fc');
  const activeColor = settings?.text?.activeColor ?? (scrolled ? '#2563eb' : '#7dd3fc');

  const logoSrc: string = (scrolled && settings?.logo?.scrolledUrl) 
    ? settings.logo!.scrolledUrl! 
    : (settings?.logo?.url ?? '/favicon.ico');

  const buildBackground = (variant: import('../types/header').BackgroundVariant | undefined) => {
    if (!variant) return undefined;
    const opacity = typeof variant.opacity === 'number' ? variant.opacity : 1;
    if (variant.type === 'transparent') return 'transparent';
    if (variant.type === 'gradient') {
      const from = variant.gradientFrom ?? '#000000';
      const to = variant.gradientTo ?? '#ffffff';
      const angle = variant.gradientAngle ?? 90;
      return `linear-gradient(${angle}deg, ${from}, ${to})`;
    }
    const color = variant.color ?? '#ffffff';
    const hex = color.replace('#', '');
    if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
      const r = parseInt(hex.substring(0,2),16);
      const g = parseInt(hex.substring(2,4),16);
      const b = parseInt(hex.substring(4,6),16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  };

  return (
    <header
      id="header"
      className={`fixed w-full z-50 transition-all duration-500`}
      style={{
        padding: settings?.size?.padding ?? undefined,
        background: (() => {
          const variant = scrolled ? settings?.background?.scrolled : settings?.background?.initial;
          return buildBackground(variant) ?? undefined;
        })(),
        backdropFilter: (() => {
          const variant = scrolled ? settings?.background?.scrolled : settings?.background?.initial;
          return variant?.blur ? `blur(${variant.blur}px)` : undefined;
        })(),
        boxShadow: (() => {
          const variant = scrolled ? settings?.background?.scrolled : settings?.background?.initial;
          return variant?.shadow ? '0 1px 8px rgba(0,0,0,0.08)' : undefined;
        })(),
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center no-underline group">
          <Image
            src={logoSrc}
            alt="logo"
            width={settings?.logo?.width ?? 140}
            height={settings?.logo?.height ?? 40}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          <ul className={`flex m-0 p-0 list-none gap-6 items-center`}>
            {navLinks.map((link: MenuItem) => (
              <li key={link.id}>
                {link.children && link.children.length ? (
                  <Dropdown menu={{ items: dropdownItemsFor(link.children) }} trigger={['hover']}>
                    <a onClick={(e) => e.preventDefault()} style={{ color: defaultTextColor }} className={`cursor-pointer flex items-center gap-1 text-sm font-medium uppercase transition-all duration-300`}>
                      <Space>
                        {link.label}
                        <DownOutlined className="text-xs" />
                      </Space>
                    </a>
                  </Dropdown>
                ) : (
                  <a
                    href={link.link || '#'}
                    onMouseEnter={() => setHovered(link.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      color: activeSection === link.id ? activeColor : hovered === link.id ? hoverColor : defaultTextColor
                    }}
                    className={`text-sm font-medium uppercase no-underline transition-all duration-300`}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}

            <li>
              <a
                href={settings?.cta?.link ?? '#contact'}
                style={{ color: activeSection === 'contact' ? activeColor : defaultTextColor }}
                className={`text-sm font-medium uppercase no-underline transition-all duration-300`}
              >
                {settings?.cta?.label ?? 'Liên Hệ'}
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="xl:hidden">
          <MenuOutlined
            style={{ color: settings?.mobile?.iconColor ?? (scrolled ? '#111827' : '#fff') }}
            className={`text-2xl cursor-pointer transition-all duration-300`}
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>

        <Drawer
          title={<span style={{ color: settings?.text?.defaultColor ?? '#0ea5a3', fontWeight: 700, fontSize: 18 }}>NEMARK</span>}
          placement="right"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          bodyStyle={{ background: settings?.mobile?.drawerBg ?? '#fff' }}
        >
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            {navLinks.map((link: MenuItem) => (
              <li key={link.id}>
                <a
                  href={link.link || '#'}
                  style={{ color: activeSection === link.id ? activeColor : settings?.mobile?.textColor ?? '#111827' }}
                  className={`text-lg font-medium block transition-all duration-300`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
             <li>
              <a
                href={settings?.cta?.link ?? '#contact'}
                style={{ color: activeSection === 'contact' ? activeColor : settings?.mobile?.textColor ?? '#111827' }}
                className={`text-lg font-medium block transition-all duration-300`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {settings?.cta?.label ?? 'Liên Hệ'}
              </a>
            </li>
          </ul>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;

