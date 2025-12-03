import React from 'react';
import { ReactElement } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Table, Tag, Space, Button, Input } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface PostType {
  key: string;
  title: string;
  author: string;
  date: string;
  status: 'published' | 'draft';
}

const columns: ColumnsType<PostType> = [
  {
    title: 'Tiêu Đề',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a className="font-medium text-blue-600 line-clamp-1">{text}</a>,
  },
  {
    title: 'Tác Giả',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Ngày Đăng',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'published' ? 'blue' : 'default'}>
        {status === 'published' ? 'Đã Đăng' : 'Nháp'}
      </Tag>
    ),
  },
  {
    title: 'Hành Động',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button type="text" icon={<EditOutlined />} className="text-blue-600" />
        <Button type="text" danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const data: PostType[] = [
  {
    key: '1',
    title: 'Xu hướng thiết kế web năm 2024',
    author: 'Admin',
    date: '2023-10-20',
    status: 'published',
  },
  {
    key: '2',
    title: 'Cách tối ưu SEO cho doanh nghiệp nhỏ',
    author: 'Editor',
    date: '2023-10-22',
    status: 'draft',
  },
  {
    key: '3',
    title: 'Giới thiệu về Nemark Agency',
    author: 'Admin',
    date: '2023-10-15',
    status: 'published',
  },
];

const PostsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 m-0">Quản Lý Bài Viết</h2>
        <Button type="primary" icon={<PlusOutlined />} size="large" className="bg-blue-600 hover:bg-blue-700">
          Viết Bài Mới
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="mb-4 flex justify-end">
            <Input 
                placeholder="Tìm kiếm bài viết..." 
                prefix={<SearchOutlined className="text-gray-400" />} 
                className="max-w-xs"
            />
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default PostsPage;
