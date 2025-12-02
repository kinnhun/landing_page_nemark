import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Props = {
  children: ReactNode;
};

const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="user-layout" style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
      <Header />
      <main style={{flex: 1, padding: '24px 16px'}}>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
