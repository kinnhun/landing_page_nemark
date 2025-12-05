import React, { ReactNode, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Props = {
  children: ReactNode;
};

const UserLayout: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading skeleton on server-side
  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {children}
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
