import React from 'react';
import { Layout, Button, Avatar, Dropdown, Badge, Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/router';

const { Header } = Layout;

interface AdminHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  
  // Generate breadcrumbs based on path (typed to match AntD Breadcrumb props)
  const pathSnippets = router.pathname.split('/').filter((i) => i);
  const extraCrumbs = pathSnippets
    .filter((seg) => seg !== 'admin')
    .map((seg, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const title = seg.charAt(0).toUpperCase() + seg.slice(1);
      return {
        title: title,
        href: url,
      };
    });

  const breadcrumbItems: BreadcrumbProps['items'] = [
    {
      title: <HomeOutlined />,
      href: '/admin',
    },
    ...extraCrumbs,
  ];

  const userMenu: MenuProps['items'] = [
    {
      key: '1',
      label: 'Hồ Sơ Của Tôi',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Cài Đặt Tài Khoản',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: 'Đăng Xuất',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Header className="!bg-white p-0 flex items-center justify-between border-b border-gray-100 z-10 sticky top-0 h-16 !pl-6 !pr-6">
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:bg-gray-100 flex items-center justify-center"
          style={{
            fontSize: '18px',
            width: 40,
            height: 40,
          }}
        />
        
        <div className="hidden md:block">
            <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 mr-2">
        <Badge count={5} size="small" offset={[-5, 5]}>
            <Button 
                type="text" 
                icon={<BellOutlined className="text-xl text-gray-500" />} 
                shape="circle" 
                className="flex items-center justify-center w-10 h-10 hover:bg-gray-100"
            />
        </Badge>

        <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>

        <Dropdown menu={{ items: userMenu }} trigger={['click']} placement="bottomRight" arrow>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 py-1 px-2 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-100">
            <Avatar 
                style={{ backgroundColor: '#2563eb' }} 
                icon={<UserOutlined />} 
                className="shadow-sm shadow-blue-200"
            />
            <div className="hidden md:block text-left leading-tight">
                <div className="text-sm font-semibold text-gray-700">Admin User</div>
                <div className="text-[11px] text-gray-400 font-medium">Administrator</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminHeader;
