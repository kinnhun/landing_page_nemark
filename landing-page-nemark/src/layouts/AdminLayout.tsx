import React, { useState, ReactNode } from 'react';
import { Layout, ConfigProvider } from 'antd';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminFooter from '../components/admin/AdminFooter';

const { Content } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb', // blue-600
          borderRadius: 6,
        },
      }}
    >
      <Layout className="min-h-screen bg-slate-50">
        <AdminSidebar collapsed={collapsed} />
        <Layout
          className={`transition-all duration-300 ease-in-out bg-slate-50`}
          style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
          <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content className="m-6 mt-8 flex-1">
            {children}
          </Content>
          <AdminFooter />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
