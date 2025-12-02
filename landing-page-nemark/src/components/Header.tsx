import Link from 'next/link';
import React from 'react';
import useUserLanguage from '../hooks/useUserLanguage';

const Header: React.FC = () => {
  const [t, lang, setLang] = useUserLanguage();

  return (
    <header className="site-header" style={{padding: '12px 20px', borderBottom: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
        <Link href="/" style={{fontWeight: 700, textDecoration: 'none'}}>
          {t('title') || 'Nemark'}
        </Link>
        <nav style={{display: 'flex', gap: 8}}>
          <Link href="/home">{t('home.heading') || 'Home'}</Link>
        </nav>
      </div>

      <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
        <span style={{fontSize: 13, color: '#666'}}>{lang}</span>
        <button onClick={() => setLang('en')} aria-label="switch-to-en">EN</button>
        <button onClick={() => setLang('vi')} aria-label="switch-to-vi">VI</button>
      </div>
    </header>
  );
};

export default Header;
