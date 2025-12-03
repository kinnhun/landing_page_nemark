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

  const textColorClass = scrolled ? 'text-gray-800' : 'text-white';
  const hoverColorClass = scrolled ? 'hover:text-blue-600' : 'hover:text-blue-300';
  const activeColorClass = scrolled ? 'text-blue-600' : 'text-blue-300';

  return (
    <header 
      id="header" 
      className={`fixed w-full z-50 transition-all duration-500 py-4 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center no-underline group">
          <h1 className={`text-3xl font-bold uppercase m-0 transition-colors duration-300 ${
            scrolled ? 'text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500' : 'text-white'
          }`}>Nemark</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          <ul className={`flex m-0 p-0 list-none gap-6 items-center ${textColorClass}`}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a 
                  href={link.href} 
                  className={`text-sm font-medium uppercase no-underline transition-colors duration-300 ${
                    activeSection === link.id ? activeColorClass : `${textColorClass} ${hoverColorClass}`
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            
            <li>
              <Dropdown menu={{ items }} trigger={['hover']}>
                <a onClick={(e) => e.preventDefault()} className={`${textColorClass} ${hoverColorClass} cursor-pointer flex items-center gap-1 text-sm font-medium uppercase transition-colors duration-300`}>
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
                  activeSection === 'contact' ? activeColorClass : `${textColorClass} ${hoverColorClass}`
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
                className={`${textColorClass} text-2xl cursor-pointer transition-colors duration-300`} 
                onClick={() => setMobileMenuOpen(true)}
            />
        </div>

        <Drawer
            title={<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500 font-bold text-xl">NEMARK</span>}
            placement="right"
            onClose={() => setMobileMenuOpen(false)}
            open={mobileMenuOpen}
        >
            <ul className="flex flex-col gap-4 list-none p-0 m-0">
                {navLinks.map(link => (
                    <li key={link.id}>
                        <a 
                            href={link.href} 
                            className={`text-lg font-medium block transition-colors duration-300 ${
                              activeSection === link.id ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
                 <li>
                    <a 
                      href="#contact" 
                      className={`text-lg font-medium block transition-colors duration-300 ${
                        activeSection === 'contact' ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
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
