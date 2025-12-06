import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu, ConfigProvider } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface AdminSidebarProps {
  collapsed: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed }) => {
  const router = useRouter();

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/settings-landing-page',
      icon: <SettingOutlined />,
      label: 'Cài Đặt Trang Home',
      children: [
        {
          key: '/admin/settings-landing-page/general',
          icon: <AppstoreOutlined />,
          label: 'Tổng Quan',
        },
        {
          key: '/admin/settings-landing-page/header',
          icon: <AppstoreOutlined />,
          label: 'Cài Đặt Header',
        },
        {
          key: '/admin/settings-landing-page/banner',
          icon: <FileTextOutlined />, 
          label: 'Cài Đặt Banner',
        },
        {
          key: '/admin/settings-landing-page/about',
          icon: <AppstoreOutlined />,
          label: 'Cài Đặt About',
        },
        {
          key: '/admin/settings-landing-page/stats',
          icon: <AppstoreOutlined />,
          label: 'Cài Đặt Thống Kê',
        },
        {
          key: '/admin/settings-landing-page/services',
          icon: <AppstoreOutlined />,
          label: 'Cài Đặt Dịch Vụ',
        },
        {
          key: '/admin/settings-landing-page/cta',
          icon: <AppstoreOutlined />,
          label: 'Cài Đặt CTA',
        },
        {
          key: '/admin/settings-landing-page/portfolio',
          icon: <FileTextOutlined />,
          label: 'Cài Đặt Portfolio',
        },
        {
          key: '/admin/settings-landing-page/pricing',
          icon: <AppstoreOutlined />,
          label: 'Cài Đặt Pricing',
        },
        {
          key: '/admin/settings-landing-page/team',
          icon: <UserOutlined />,
          label: 'Cài Đặt Team',
        },
        {
          key: '/admin/settings-landing-page/contact',
          icon: <FileTextOutlined />,
          label: 'Cài Đặt Liên Hệ',
        },
      ],
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'Cài Đặt',
    },
  ];

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed} 
      className="bg-white border-r border-gray-100 z-20 fixed left-0 top-0 bottom-0 h-screen overflow-y-auto scrollbar-hide" 
      width={260}
      theme="light"
      
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100 shrink-0">
          <Link href="/admin" className="no-underline flex items-center justify-center w-full">
              {collapsed ? (
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                    N
                  </div>
              ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
                      N
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 m-0 tracking-tight">NEMARK</h1>
                  </div>
              )}
          </Link>
        </div>

        {/* Main Menu */}
        <div className="flex-1 py-4 overflow-y-auto">
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemSelectedBg: '#eff6ff', // blue-50
                  itemSelectedColor: '#2563eb', // blue-600
                  itemHoverBg: '#f8fafc', // slate-50
                  itemBorderRadius: 8,
                  itemMarginInline: 12,
                }
              }
            }}
          >
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[router.pathname]}
              defaultOpenKeys={router.pathname.startsWith('/admin/settings-landing-page') ? ['/admin/settings-landing-page'] : []}
              onClick={({ key }) => router.push(key)}
              items={menuItems}
              className="border-r-0 font-medium text-gray-600"
            />
          </ConfigProvider>
        </div>
        
        {/* Footer / Logout */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    itemHoverBg: '#fef2f2', // red-50
                    itemBorderRadius: 8,
                    itemMarginInline: 0,
                  }
                }
              }}
            >
            <Menu
                theme="light"
                mode="inline"
                selectable={false}
                items={[
                    {
                        key: 'logout',
                        icon: <LogoutOutlined className="text-red-500" />,
                        label: <span className="text-red-500 font-medium">Đăng Xuất</span>,
                        onClick: () => router.push('/'),
                    }
                ]}
                className="border-r-0"
            />
          </ConfigProvider>
        </div>
      </div>
    </Sider>
  );
};

export default AdminSidebar;
