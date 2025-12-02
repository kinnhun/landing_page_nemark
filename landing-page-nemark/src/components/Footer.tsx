import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container">
        
        <h3 className="sitename">Nemark</h3>
        <p>
          Nemark cung cấp giải pháp thiết kế website, phần mềm, AI automation 
          và chuyển đổi số giúp doanh nghiệp tối ưu vận hành và phát triển bền vững.
        </p>

        {/* SOCIAL */}
        <div className="social-links d-flex justify-content-center">
          <a href="#"><i className="bi bi-twitter-x"></i></a>
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-skype"></i></a>
          <a href="#"><i className="bi bi-linkedin"></i></a>
        </div>

        <div className="container">
          {/* COPYRIGHT */}
          <div className="copyright">
            <span>Bản quyền ©</span>
            <strong className="px-1 sitename">Nemark</strong>
            <span>– Giữ toàn quyền.</span>
          </div>

          {/* CREDITS */}
          <div className="credits">
            Phát triển bởi <Link href="/">KinKin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
