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

  // Tránh hydrate mismatch
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return (
    <Layout className="h-screen overflow-hidden bg-slate-50">
      {/* SIDEBAR cố định bên trái */}
      <AdminSidebar collapsed={collapsed} />

      {/* Khu vực bên phải: header + content + footer */}
      <Layout
        className="transition-all duration-300 ease-in-out bg-slate-50"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* CHỈ content được cuộn */}
        <Content className="m-6 mt-8 flex-1 overflow-y-auto min-h-0">
          {children}
        </Content>

        <AdminFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
