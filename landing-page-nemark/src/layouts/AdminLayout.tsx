import React, { useState, ReactNode, useEffect } from "react";
import { Layout } from "antd";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";

const { Content } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring client-side state
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Prevent rendering layout until mounted to avoid hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <Layout className="min-h-screen" style={{ background: 'var(--brand-background)' }}>
      <AdminSidebar collapsed={collapsed} />
      <Layout
        className="transition-all duration-300 ease-in-out"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: 'var(--brand-background)',
          color: 'var(--brand-text)'
        }}
      >
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="m-6 mt-8 flex-1">{children}</Content>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
