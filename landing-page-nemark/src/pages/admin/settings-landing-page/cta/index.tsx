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
  Radio,
  Slider,
  Switch,
  Upload,
  message,
} from "antd";
import { notifyCustom } from "../../../../components/notificationsCustom";
import { SaveOutlined, ReloadOutlined, UploadOutlined } from "@ant-design/icons";
import type { CtaSettings } from "../../../../types/cta";
import { getCtaSettings, updateCtaSettings } from "../../../../services/ctaApi";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CtaSettingsPage: React.FC = () => {
  const [form] = Form.useForm<CtaSettings>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient'>('gradient');

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCtaSettings();
      form.setFieldsValue(data);
      setBackgroundType(data.background.type);
    } catch (error) {
      console.error("Failed to fetch CTA settings:", error);
      notifyCustom("error", { title: "Lỗi tải cài đặt" });
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const onFinish = async (values: CtaSettings) => {
    setSaving(true);
    try {
      const updatedData = await updateCtaSettings(values);
      notifyCustom("success", { title: "Đã lưu cài đặt" });
      
      // Update form with the response data
      form.setFieldsValue(updatedData);
      
      // Broadcast update
      const channel = new BroadcastChannel('app-settings');
      channel.postMessage({ type: 'cta-updated', data: updatedData });
      channel.close();
    } catch (error) {
      console.error("Failed to save CTA settings:", error);
      notifyCustom("error", { title: "Lỗi lưu cài đặt" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="mb-0!">Cài đặt Call To Action</Title>
          <Text type="secondary">Quản lý nội dung và giao diện section kêu gọi hành động</Text>
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
        {/* Content Section */}
        <Card title="Nội dung" className="shadow-sm mb-6">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
              >
                <Input placeholder="Ví dụ: Đồng Hành Cùng Nemark..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
              >
                <TextArea rows={3} placeholder="Mô tả chi tiết..." />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Background Settings */}
        <Card title="Cài đặt nền" className="shadow-sm mb-6">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="backgroundImage"
                label="Đường dẫn ảnh nền"
              >
                <Input placeholder="/assets/img/cta-bg.jpg" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['background', 'type']}
                label="Loại nền"
              >
                <Radio.Group onChange={(e) => setBackgroundType(e.target.value)}>
                  <Radio value="solid">Màu đơn</Radio>
                  <Radio value="gradient">Gradient</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {backgroundType === 'gradient' && (
              <>
                <Col span={12}>
                  <Form.Item
                    name={['background', 'gradientFrom']}
                    label="Màu gradient bắt đầu"
                  >
                    <Input type="color" className="h-10" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['background', 'gradientTo']}
                    label="Màu gradient kết thúc"
                  >
                    <Input type="color" className="h-10" />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col span={24}>
              <Form.Item
                name={['background', 'opacity']}
                label="Độ mờ nền"
              >
                <Slider min={0} max={1} step={0.1} marks={{ 0: '0%', 0.5: '50%', 1: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Overlay Settings */}
        <Card title="Lớp phủ ảnh nền" className="shadow-sm mb-6">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={['overlay', 'enabled']}
                label="Bật lớp phủ"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['overlay', 'opacity']}
                label="Độ mờ lớp phủ"
              >
                <Slider min={0} max={1} step={0.1} marks={{ 0: '0%', 0.5: '50%', 1: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Button Settings */}
        <Card title="Cài đặt nút" className="shadow-sm">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['button', 'label']}
                label="Nhãn nút"
                rules={[{ required: true, message: 'Vui lòng nhập nhãn nút' }]}
              >
                <Input placeholder="Liên Hệ Ngay" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['button', 'link']}
                label="Đường dẫn"
                rules={[{ required: true, message: 'Vui lòng nhập đường dẫn' }]}
              >
                <Input placeholder="#contact" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['button', 'visible']}
                label="Hiển thị nút"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['button', 'backgroundColor']}
                label="Màu nền nút"
              >
                <Input type="color" className="h-10" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['button', 'textColor']}
                label="Màu chữ nút"
              >
                <Input type="color" className="h-10" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['button', 'hoverBackgroundColor']}
                label="Màu nền khi hover"
              >
                <Input type="color" className="h-10" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['button', 'hoverTextColor']}
                label="Màu chữ khi hover"
              >
                <Input type="color" className="h-10" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CtaSettingsPage;
