import React from 'react';
import { ReactElement } from 'react';
import { Form, Input, Button, Switch, Divider, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

interface SettingsFormValues {
  siteName: string;
  siteEmail: string;
  maintenanceMode: boolean;
  language: 'vi' | 'en' | string;
}

const SettingsPage = () => {
  const [form] = Form.useForm<SettingsFormValues>();

  const onFinish = (values: SettingsFormValues) => {
    console.log('Success:', values);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cài Đặt Hệ Thống</h2>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            siteName: 'Nemark Agency',
            siteEmail: 'contact@nemark.com',
            maintenanceMode: false,
            language: 'vi',
          }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Thông Tin Chung</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
                label="Tên Website"
                name="siteName"
                rules={[{ required: true, message: 'Vui lòng nhập tên website!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email Liên Hệ"
                name="siteEmail"
                rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
            >
                <Input />
            </Form.Item>
          </div>

          <Form.Item
            label="Ngôn Ngữ Mặc Định"
            name="language"
          >
            <Select>
                <Select.Option value="vi">Tiếng Việt</Select.Option>
                <Select.Option value="en">English</Select.Option>
            </Select>
          </Form.Item>

          <Divider />

          <h3 className="text-lg font-semibold text-gray-700 mb-4">Cấu Hình Khác</h3>
          
          <Form.Item
            label="Chế Độ Bảo Trì"
            name="maintenanceMode"
            valuePropName="checked"
            help="Khi bật, website sẽ hiển thị trang bảo trì cho người dùng."
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="bg-blue-600 hover:bg-blue-700">
              Lưu Cài Đặt
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SettingsPage;
