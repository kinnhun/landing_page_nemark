import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Select,
} from "antd";
import { notifyCustom } from "../../../../components/notificationsCustom";
import { SaveOutlined, ReloadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ServicesSettings } from "../../../../types/services";
import { getServicesSettings, updateServicesSettings } from "../../../../services/servicesApi";
import * as Icons from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const iconOptions = Object.keys(Icons)
  .filter((key) => key.endsWith("Outlined"))
  .map((key) => ({ label: key, value: key }));

const ServicesSettingsPage: React.FC = () => {
  const [form] = Form.useForm<ServicesSettings>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServicesSettings();
      form.setFieldsValue(data);
    } catch (error) {
      console.error("Failed to fetch services settings:", error);
      notifyCustom("error", { title: "Lỗi tải cài đặt" });
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const onFinish = async (values: ServicesSettings) => {
    setSaving(true);
    try {
      const updatedData = await updateServicesSettings(values);
      notifyCustom("success", { title: "Đã lưu cài đặt" });
      
      // Update form with the response data
      form.setFieldsValue(updatedData);
      
      // Broadcast update
      const channel = new BroadcastChannel('app-settings');
      channel.postMessage({ type: 'services-updated', data: updatedData });
      channel.close();
    } catch (error) {
      console.error("Failed to save services settings:", error);
      notifyCustom("error", { title: "Lỗi lưu cài đặt" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="!mb-0">Cài đặt Dịch Vụ</Title>
          <Text type="secondary">Quản lý thông tin các dịch vụ hiển thị trên trang chủ</Text>
        </div>
        <Space>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={fetchSettings}
            loading={loading}
          >
            Làm mới
          </Button>
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={() => form.submit()}
            loading={saving}
          >
            Lưu thay đổi
          </Button>
        </Space>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={loading}
      >
        <Card title="Thông tin chung" className="shadow-sm mb-6">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Tiêu đề section"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
              >
                <Input placeholder="Ví dụ: Dịch Vụ Của Chúng Tôi" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả ngắn"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
              >
                <TextArea rows={2} placeholder="Mô tả ngắn về các dịch vụ..." />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Danh sách dịch vụ" className="shadow-sm">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div className="flex flex-col gap-4">
                {fields.map(({ key, name, ...restField }) => (
                  <Card 
                    key={key} 
                    size="small" 
                    className="bg-gray-50"
                    extra={
                      <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => remove(name)}
                      />
                    }
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          label="Tên dịch vụ"
                          rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
                        >
                          <Input placeholder="Ví dụ: Thiết Kế Website" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'icon']}
                          label="Icon (Ant Design)"
                          rules={[{ required: true, message: 'Vui lòng chọn icon' }]}
                        >
                          <Select 
                            showSearch
                            placeholder="Chọn icon"
                            options={iconOptions}
                            filterOption={(input, option) =>
                              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          label="Mô tả chi tiết"
                          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        >
                          <TextArea rows={2} placeholder="Mô tả chi tiết về dịch vụ..." />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          name={[name, 'link']}
                          label="Đường dẫn (Link)"
                        >
                          <Input placeholder="#" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm dịch vụ mới
                </Button>
              </div>
            )}
          </Form.List>
        </Card>
      </Form>
    </div>
  );
};

export default ServicesSettingsPage;
