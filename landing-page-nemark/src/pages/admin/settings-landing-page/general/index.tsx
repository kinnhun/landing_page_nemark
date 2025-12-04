import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Row,
  Col,
  Select,
  ColorPicker,
  Modal
} from 'antd';
import { SaveOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { notifyCustom } from '@/components/notificationsCustom';

const { Title, Text } = Typography;
const { Option } = Select;

interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface Typography {
  primaryFont: string;
  headingFont: string;
  baseFontSize: string;
  headingFontWeight: string;
  bodyFontWeight: string;
  lineHeight: string;
}

interface GeneralSettings {
  brandColors: BrandColors;
  typography: Typography;
}

const fontOptions = [
  'Inter, sans-serif',
  'Plus Jakarta Sans, sans-serif',
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif',
  'Montserrat, sans-serif',
  'Poppins, sans-serif',
  'Nunito, sans-serif',
  'Arial, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
];

const fontWeightOptions = ['300', '400', '500', '600', '700', '800', '900'];

const GeneralSettingsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [demoVisible, setDemoVisible] = useState(false);

  // Load settings on mount
  useEffect(() => {
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSettings = async () => {
    try {
      // Try loading from localStorage first
      const savedSettings = localStorage.getItem('generalSettings');
      if (savedSettings) {
        const data = JSON.parse(savedSettings);
        setSettings(data);
        form.setFieldsValue({
          ...data.brandColors,
          ...data.typography,
        });
        return;
      }

      // Fallback: load default from public folder
      const response = await fetch('/settingdata/general.json');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        form.setFieldsValue({
          ...data.brandColors,
          ...data.typography,
        });
      }
    } catch {
      notifyCustom('error', { title: 'Lỗi', description: 'Không thể tải cài đặt' });
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const newSettings: GeneralSettings = {
        brandColors: {
          primary: typeof values.primary === 'string' ? values.primary : values.primary?.toHexString() || '#2563eb',
          secondary: typeof values.secondary === 'string' ? values.secondary : values.secondary?.toHexString() || '#10b981',
          accent: typeof values.accent === 'string' ? values.accent : values.accent?.toHexString() || '#f59e0b',
          background: typeof values.background === 'string' ? values.background : values.background?.toHexString() || '#ffffff',
          text: typeof values.text === 'string' ? values.text : values.text?.toHexString() || '#1f2937',
        },
        typography: {
          primaryFont: values.primaryFont,
          headingFont: values.headingFont,
          baseFontSize: values.baseFontSize,
          headingFontWeight: values.headingFontWeight,
          bodyFontWeight: values.bodyFontWeight,
          lineHeight: values.lineHeight,
        },
      };

      // Save to localStorage (works with static export)
      localStorage.setItem('generalSettings', JSON.stringify(newSettings));
      // notify and update ThemeProvider immediately
      notifyCustom('success', { title: 'Thành công', description: 'Đã lưu cài đặt thành công!' });
      setSettings(newSettings);
      // dispatch custom event so ThemeContext picks up change in same tab
      try {
        window.dispatchEvent(new CustomEvent('generalSettingsUpdated', { detail: newSettings }));
      } catch {}

      // Optional: If you have a server API, save there too
      // const response = await fetch('/api/settings/general', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newSettings),
      // });
    } catch {
      notifyCustom('error', { title: 'Lỗi', description: 'Có lỗi xảy ra khi lưu cài đặt' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (settings) {
      form.setFieldsValue({
        ...settings.brandColors,
        ...settings.typography,
      });
      notifyCustom('info', { title: 'Khôi phục', description: 'Đã khôi phục về cài đặt đã lưu' });
    }
  };

  const handleDemo = () => {
    setDemoVisible(true);
  };

  const currentValues = form.getFieldsValue();

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2} className="mb-2!">
          Cài Đặt Chung
        </Title>
        <Text type="secondary">
          Tùy chỉnh màu sắc và kiểu chữ cho trang web của bạn
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          primary: '#2563eb',
          secondary: '#10b981',
          accent: '#f59e0b',
          background: '#ffffff',
          text: '#1f2937',
          primaryFont: 'Inter, sans-serif',
          headingFont: 'Plus Jakarta Sans, sans-serif',
          baseFontSize: '16px',
          headingFontWeight: '700',
          bodyFontWeight: '400',
          lineHeight: '1.6',
        }}
      >
        {/* Brand Colors Section */}
        <Card title="🎨 Nền Tảng Màu (Brand Colors)" className="mb-6 shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Màu Chính (Primary)"
                name="primary"
                rules={[{ required: true, message: 'Vui lòng chọn màu chính' }]}
              >
                <ColorPicker 
                  showText 
                  format="hex"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Màu Phụ (Secondary)"
                name="secondary"
                rules={[{ required: true }]}
              >
                <ColorPicker 
                  showText 
                  format="hex"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Màu Nhấn (Accent)"
                name="accent"
                rules={[{ required: true }]}
              >
                <ColorPicker 
                  showText 
                  format="hex"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Màu Nền (Background)"
                name="background"
                rules={[{ required: true }]}
              >
                <ColorPicker 
                  showText 
                  format="hex"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Màu Chữ (Text)"
                name="text"
                rules={[{ required: true }]}
              >
                <ColorPicker 
                  showText 
                  format="hex"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Typography Section */}
        <Card title="✏️ Typography – Kiểu Chữ" className="mb-6 shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Font Chữ Chính (Primary Font)"
                name="primaryFont"
                rules={[{ required: true, message: 'Vui lòng chọn font chữ chính' }]}
              >
                <Select size="large" showSearch>
                  {fontOptions.map((font) => (
                    <Option key={font} value={font}>
                      <span style={{ fontFamily: font }}>{font}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Font Chữ Tiêu Đề (Heading Font)"
                name="headingFont"
                rules={[{ required: true }]}
              >
                <Select size="large" showSearch>
                  {fontOptions.map((font) => (
                    <Option key={font} value={font}>
                      <span style={{ fontFamily: font }}>{font}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Cỡ Chữ Cơ Bản (Base Font Size)"
                name="baseFontSize"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="16px" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Độ Đậm Tiêu Đề (Heading Weight)"
                name="headingFontWeight"
                rules={[{ required: true }]}
              >
                <Select size="large">
                  {fontWeightOptions.map((weight) => (
                    <Option key={weight} value={weight}>
                      {weight}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Độ Đậm Chữ Thường (Body Weight)"
                name="bodyFontWeight"
                rules={[{ required: true }]}
              >
                <Select size="large">
                  {fontWeightOptions.map((weight) => (
                    <Option key={weight} value={weight}>
                      {weight}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Khoảng Cách Dòng (Line Height)"
                name="lineHeight"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="1.6" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Action Buttons */}
        <Card className="shadow-sm">
          <Space size="middle" wrap>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={loading}
            >
              Lưu Cài Đặt
            </Button>
            <Button
              size="large"
              icon={<EyeOutlined />}
              onClick={handleDemo}
            >
              Xem Demo
            </Button>
            <Button
              size="large"
              icon={<ReloadOutlined />}
              onClick={handleReset}
            >
              Khôi Phục
            </Button>
          </Space>
        </Card>
      </Form>

      {/* Demo Preview Modal */}
      <Modal
        title="🎨 Xem Trước Giao Diện"
        open={demoVisible}
        onCancel={() => setDemoVisible(false)}
        width={900}
        footer={[
          <Button key="close" onClick={() => setDemoVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        <div
          style={{
            fontFamily: currentValues.primaryFont,
            fontSize: currentValues.baseFontSize,
            lineHeight: currentValues.lineHeight,
            backgroundColor: currentValues.background,
            color: currentValues.text,
            padding: '32px',
            borderRadius: '8px',
          }}
        >
          <h1
            style={{
              fontFamily: currentValues.headingFont,
              fontWeight: currentValues.headingFontWeight,
              color: currentValues.primary,
              marginBottom: '16px',
            }}
          >
            Tiêu Đề Chính (H1)
          </h1>
          <h2
            style={{
              fontFamily: currentValues.headingFont,
              fontWeight: currentValues.headingFontWeight,
              color: currentValues.secondary,
              marginBottom: '12px',
            }}
          >
            Tiêu Đề Phụ (H2)
          </h2>
          <p style={{ fontWeight: currentValues.bodyFontWeight, marginBottom: '16px' }}>
            Đây là đoạn văn bản mẫu với font chữ chính và độ đậm thông thường. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button
              type="primary"
              style={{
                backgroundColor: currentValues.primary,
                borderColor: currentValues.primary,
              }}
            >
              Primary Button
            </Button>
            <Button
              style={{
                backgroundColor: currentValues.secondary,
                borderColor: currentValues.secondary,
                color: '#fff',
              }}
            >
              Secondary Button
            </Button>
            <Button
              style={{
                backgroundColor: currentValues.accent,
                borderColor: currentValues.accent,
                color: '#fff',
              }}
            >
              Accent Button
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GeneralSettingsPage;