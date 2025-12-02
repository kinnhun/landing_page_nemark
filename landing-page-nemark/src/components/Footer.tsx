import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container">
        <h3 className="sitename">Nemark</h3>
        <p>Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga maxime saepe commodi placeat.</p>
        <div className="social-links d-flex justify-content-center">
          <a href=""><i className="bi bi-twitter-x"></i></a>
          <a href=""><i className="bi bi-facebook"></i></a>
          <a href=""><i className="bi bi-instagram"></i></a>
          <a href=""><i className="bi bi-skype"></i></a>
          <a href=""><i className="bi bi-linkedin"></i></a>
        </div>
        <div className="container">
          <div className="copyright">
            <span>Copyright</span> <strong className="px-1 sitename">Nemark</strong> <span>All Rights Reserved</span>
          </div>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
