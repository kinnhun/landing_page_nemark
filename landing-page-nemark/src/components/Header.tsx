import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Drawer, Dropdown, Space } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      const sections = ['hero', 'about', 'services', 'portfolio', 'team', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with some offset)
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items: MenuProps['items'] = [
    { key: '1', label: <a href="#">Tài Nguyên</a> },
    { 
      key: '2', 
      label: 'Danh Mục Con',
      children: [
        { key: '2-1', label: <a href="#">Mục Con 1</a> },
        { key: '2-2', label: <a href="#">Mục Con 2</a> },
        { key: '2-3', label: <a href="#">Mục Con 3</a> },
        { key: '2-4', label: <a href="#">Mục Con 4</a> },
        { key: '2-5', label: <a href="#">Mục Con 5</a> },
      ]
    },
    { key: '3', label: <a href="#">Hỗ Trợ</a> },
    { key: '4', label: <a href="#">Chính Sách</a> },
    { key: '5', label: <a href="#">Liên Kết</a> },
  ];

  const navLinks = [
    { href: '#hero', label: 'Trang Chủ', id: 'hero' },
    { href: '#about', label: 'Giới Thiệu', id: 'about' },
    { href: '#services', label: 'Dịch Vụ', id: 'services' },
    { href: '#portfolio', label: 'Dự Án', id: 'portfolio' },
    { href: '#team', label: 'Đội Ngũ', id: 'team' },
  ];

  return (
    <header 
      id="header" 
      className={`fixed w-full z-50 transition-all duration-500 py-4 ${
        scrolled ? 'bg-[#474d52] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center text-white no-underline">
          <h1 className="text-3xl font-normal uppercase m-0 text-white">Nemark</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          <ul className="flex m-0 p-0 list-none gap-6 items-center">
            {navLinks.map(link => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  className={`text-sm font-medium uppercase no-underline transition-colors duration-300 ${
                    activeSection === link.id ? 'text-blue-500' : 'text-white hover:text-blue-500'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            
            <li>
              <Dropdown menu={{ items }} trigger={['hover']}>
                <a onClick={(e) => e.preventDefault()} className="text-white hover:text-blue-500 cursor-pointer flex items-center gap-1 text-sm font-medium uppercase transition-colors duration-300">
                  <Space>
                    Thêm
                    <DownOutlined className="text-xs" />
                  </Space>
                </a>
              </Dropdown>
            </li>

            <li>
              <a 
                href="#contact" 
                className={`text-sm font-medium uppercase no-underline transition-colors duration-300 ${
                  activeSection === 'contact' ? 'text-blue-500' : 'text-white hover:text-blue-500'
                }`}
              >
                Liên Hệ
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="xl:hidden">
            <MenuOutlined 
                className="text-white text-2xl cursor-pointer" 
                onClick={() => setMobileMenuOpen(true)}
            />
        </div>

        <Drawer
            title="Menu"
            placement="right"
            onClose={() => setMobileMenuOpen(false)}
            open={mobileMenuOpen}
        >
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
                {navLinks.map(link => (
                    <li key={link.id}>
                        <a 
                            href={link.href} 
                            className="text-gray-800 hover:text-blue-500 text-lg font-medium block"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
                 <li>
                    <a href="#contact" className="text-gray-800 hover:text-blue-500 text-lg font-medium block" onClick={() => setMobileMenuOpen(false)}>
                        Liên Hệ
                    </a>
                </li>
            </ul>
        </Drawer>

      </div>
    </header>
  );
};

export default Header;
