import React from 'react';
import useUserLanguage from '../hooks/useUserLanguage';

const Footer: React.FC = () => {
  const [t] = useUserLanguage();

  return (
    <footer style={{padding: '20px', borderTop: '1px solid #eaeaea', marginTop: 40, textAlign: 'center', color: '#666'}}>
      <div>{t('title') || 'Nemark'}</div>
      <small>© {new Date().getFullYear()} Nemark. All rights reserved.</small>
    </footer>
  );
};

export default Footer;
