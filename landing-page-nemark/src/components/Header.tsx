import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

        <Link href="/" className="logo d-flex align-items-center">
          {/* <img src="/assets/img/logo.png" alt="" /> */}
          <h1 className="sitename">Nemark</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#hero" className="active">Trang Chủ</a></li>
            <li><a href="#about">Giới Thiệu</a></li>
            <li><a href="#services">Dịch Vụ</a></li>
            <li><a href="#portfolio">Dự Án</a></li>
            <li><a href="#team">Đội Ngũ</a></li>

            <li className="dropdown">
              <a href="#">
                <span>Thêm</span>
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li><a href="#">Tài Nguyên</a></li>

                <li className="dropdown">
                  <a href="#">
                    <span>Danh Mục Con</span>
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>

                  <ul>
                    <li><a href="#">Mục Con 1</a></li>
                    <li><a href="#">Mục Con 2</a></li>
                    <li><a href="#">Mục Con 3</a></li>
                    <li><a href="#">Mục Con 4</a></li>
                    <li><a href="#">Mục Con 5</a></li>
                  </ul>
                </li>

                <li><a href="#">Hỗ Trợ</a></li>
                <li><a href="#">Chính Sách</a></li>
                <li><a href="#">Liên Kết</a></li>
              </ul>
            </li>

            <li><a href="#contact">Liên Hệ</a></li>
          </ul>

          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

      </div>
    </header>
  );
};

export default Header;
