import React from 'react';
import { ReactElement } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ShoppingCartOutlined, DollarOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tuổi',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Địa Chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    age: 32,
    address: 'Hà Nội, Việt Nam',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Trần Thị B',
    age: 42,
    address: 'Hồ Chí Minh, Việt Nam',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Lê Văn C',
    age: 32,
    address: 'Đà Nẵng, Việt Nam',
    tags: ['cool', 'teacher'],
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tổng Quan</h2>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Tổng Doanh Thu"
              value={112893}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="₫"
            />
            <div className="mt-2 text-sm text-gray-500">
                <ArrowUpOutlined className="text-green-500 mr-1" /> 
                <span className="text-green-500 font-medium">12%</span> so với tháng trước
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Người Dùng Mới"
              value={93}
              valueStyle={{ color: '#2563eb' }}
              prefix={<UserOutlined />}
            />
             <div className="mt-2 text-sm text-gray-500">
                <ArrowUpOutlined className="text-green-500 mr-1" /> 
                <span className="text-green-500 font-medium">5%</span> so với tuần trước
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Đơn Hàng"
              value={245}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ShoppingCartOutlined />}
            />
             <div className="mt-2 text-sm text-gray-500">
                <ArrowDownOutlined className="text-red-500 mr-1" /> 
                <span className="text-red-500 font-medium">2%</span> so với hôm qua
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Lượt Truy Cập"
              value={1256}
              prefix={<EyeOutlined />}
            />
             <div className="mt-2 text-sm text-gray-500">
                <ArrowUpOutlined className="text-green-500 mr-1" /> 
                <span className="text-green-500 font-medium">18%</span> so với hôm qua
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Users Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Người Dùng Gần Đây</h3>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminDashboard;
