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
  InputNumber,
} from "antd";
import { notifyCustom } from "../../../../components/notificationsCustom";
import { SaveOutlined, ReloadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { StatsSettings } from "../../../../types/stats";
import { getStatsSettings, updateStatsSettings } from "../../../../services/statsApi";

const { Title, Text } = Typography;

const StatsSettingsPage: React.FC = () => {
  const [form] = Form.useForm<StatsSettings>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStatsSettings();
      form.setFieldsValue(data);
    } catch (error) {
      console.error("Failed to fetch stats settings:", error);
      notifyCustom("error", { title: "Lỗi tải cài đặt" });
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const onFinish = async (values: StatsSettings) => {
    setSaving(true);
    try {
      await updateStatsSettings(values);
      notifyCustom("success", { title: "Đã lưu cài đặt" });
      
      // Broadcast update
      const channel = new BroadcastChannel('app-settings');
      channel.postMessage({ type: 'stats-updated', data: values });
      channel.close();
    } catch (error) {
      console.error("Failed to save stats settings:", error);
      notifyCustom("error", { title: "Lỗi lưu cài đặt" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="!mb-0">Cài đặt Thống Kê</Title>
          <Text type="secondary">Quản lý các số liệu thống kê hiển thị trên trang chủ</Text>
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
        <Card title="Danh sách thống kê" className="shadow-sm">
          <Form.List name="stats">
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
                      <Col span={16}>
                        <Form.Item
                          {...restField}
                          name={[name, 'label']}
                          label="Nhãn hiển thị"
                          rules={[{ required: true, message: 'Vui lòng nhập nhãn' }]}
                        >
                          <Input placeholder="Ví dụ: Khách Hàng Tin Dùng" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          label="Giá trị"
                          rules={[{ required: true, message: 'Vui lòng nhập giá trị' }]}
                        >
                          <InputNumber className="w-full" min={0} placeholder="232" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm thống kê mới
                </Button>
              </div>
            )}
          </Form.List>
        </Card>
      </Form>
    </div>
  );
};

export default StatsSettingsPage;
