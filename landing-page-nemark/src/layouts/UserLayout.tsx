import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Props = {
  children: ReactNode;
};

const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
