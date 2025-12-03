import React from 'react';
import { ReactElement } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Table, Tag, Space, Button, Input, Tooltip } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface UserType {
  key: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive';
  lastLogin: string;
}

const columns: ColumnsType<UserType> = [
  {
    title: 'Tên Người Dùng',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a className="font-medium text-blue-600 hover:text-blue-800">{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Vai Trò',
    dataIndex: 'role',
    key: 'role',
    render: (role) => {
      let color = 'geekblue';
      if (role === 'admin') {
        color = 'volcano';
      } else if (role === 'editor') {
        color = 'green';
      }
      return (
        <Tag color={color} key={role}>
          {role.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'active' ? 'success' : 'default'}>
        {status === 'active' ? 'Hoạt Động' : 'Vô Hiệu'}
      </Tag>
    ),
  },
  {
    title: 'Đăng Nhập Cuối',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
  },
  {
    title: 'Hành Động',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<EditOutlined />} className="text-blue-600 hover:bg-blue-50" />
        </Tooltip>
        <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} className="hover:bg-red-50" />
        </Tooltip>
      </Space>
    ),
  },
];

const data: UserType[] = [
  {
    key: '1',
    name: 'Admin User',
    email: 'admin@nemark.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-10-25 10:30',
  },
  {
    key: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-10-24 15:45',
  },
  {
    key: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'editor',
    status: 'inactive',
    lastLogin: '2023-10-20 09:15',
  },
  {
    key: '4',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-10-25 08:00',
  },
];

const UsersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 m-0">Quản Lý Người Dùng</h2>
        <Button type="primary" icon={<UserAddOutlined />} size="large" className="bg-blue-600 hover:bg-blue-700">
          Thêm Người Dùng
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="mb-4 flex justify-end">
            <Input 
                placeholder="Tìm kiếm người dùng..." 
                prefix={<SearchOutlined className="text-gray-400" />} 
                className="max-w-xs"
            />
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default UsersPage;
