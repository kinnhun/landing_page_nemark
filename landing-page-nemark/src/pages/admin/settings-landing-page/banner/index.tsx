import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Form,
  Input,
  Switch,
  Button,
  Slider,
  Row,
  Col,
  Divider,
  Typography,
  ColorPicker,
  Image,
  Space,
  Tooltip,
  Upload,
  Modal,
} from "antd";
import { notifyCustom } from "../../../../components/notificationsCustom";
import { SaveOutlined, ReloadOutlined, PictureOutlined, UploadOutlined } from "@ant-design/icons";
import type { BannerSettings } from "../../../../types/banner";
import { getBannerSettings, saveBannerSettings, uploadImage } from "../../../../services/bannerApi";
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '../../../../utils/cropImage';
import type { RcFile } from 'antd/es/upload';

const { Title, Text } = Typography;

const AVAILABLE_IMAGES = [
  '/assets/img/hero-bg.jpg',
  '/assets/img/cta-bg.jpg',
  '/assets/img/services.jpg',
  '/assets/img/about.jpg',
];

const BannerSettingsPage: React.FC = () => {
  const [form] = Form.useForm<BannerSettings>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Watch background image for preview
  const backgroundImage = Form.useWatch('backgroundImage', form);

  // Crop state
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixelsParam: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsParam);
  }, []);

  const onFileChange = (file: RcFile) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result as string);
      setIsModalOpen(true);
    });
    reader.readAsDataURL(file);
    return false; // Prevent upload
  };

  const handleSaveCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    
    setUploading(true);
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImageBlob) {
        const file = new File([croppedImageBlob], "banner-bg.jpg", { type: "image/jpeg" });
        const url = await uploadImage(file);
        if (url) {
          form.setFieldValue('backgroundImage', url);
          setIsModalOpen(false);
          setImageSrc(null);
          notifyCustom("success", { title: "Image uploaded successfully" });
        } else {
          notifyCustom("error", { title: "Failed to upload image" });
        }
      }
    } catch (e) {
      console.error(e);
      notifyCustom("error", { title: "Error cropping image" });
    } finally {
      setUploading(false);
    }
  };

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBannerSettings();

      if (data) {
        form.setFieldsValue({
          ...data,
          overlay: {
            enabled: data.overlay?.enabled ?? true,
            opacity: data.overlay?.opacity ?? 0.85,
            fromColor: data.overlay?.fromColor || "#1E3A8A",
            toColor: data.overlay?.toColor || "#115E59",
          },
          cta: {
            visible: data.cta?.visible ?? true,
            label: data.cta?.label ?? "",
            link: data.cta?.link ?? "",
          },
        });
      } else {
        // không có dữ liệu thì dùng default
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      notifyCustom("error", { title: "Không thể tải cài đặt banner" });
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const onFinish = async (values: BannerSettings) => {
    setSaving(true);
    try {
      // Validate thêm một chút trước khi gửi
      if (values.cta?.visible) {
        if (!values.cta.label?.trim()) {
          notifyCustom("error", { title: "Vui lòng nhập Button Label khi bật CTA" });
          setSaving(false);
          return;
        }
        if (!values.cta.link?.trim()) {
          notifyCustom("error", { title: "Vui lòng nhập Button Link khi bật CTA" });
          setSaving(false);
          return;
        }
      }

      // helper: convert ColorPicker value (object) or string to hex string
      const resolveColorToHex = (c: unknown): string => {
        if (c === null || c === undefined) return "";
        if (typeof c === "string") return c;
        if (typeof c === "object") {
          const obj = c as Record<string, unknown>;
          const toHex = obj["toHexString"];
          if (typeof toHex === "function") return (toHex as () => string)();
          const hex = obj["hex"];
          if (typeof hex === "string") return hex;
          if (typeof obj.toString === "function") return obj.toString();
        }
        return String(c);
      };

      const v = values as unknown as { overlay?: { fromColor?: unknown; toColor?: unknown } };

      const formattedValues: BannerSettings = {
        ...values,
        overlay: {
          ...values.overlay,
          fromColor: resolveColorToHex(v.overlay?.fromColor),
          toColor: resolveColorToHex(v.overlay?.toColor),
        },
      };

      const result = await saveBannerSettings(formattedValues);
      if (result) {
        notifyCustom("success", { title: "Lưu cài đặt banner thành công" });
        
        // Broadcast the updated settings so other pages (e.g. Home) can update immediately
        try {
          const channel = new BroadcastChannel('app_settings_channel');
          channel.postMessage('banner-updated');
          channel.close();

          window.dispatchEvent(
            new CustomEvent("bannerSettingsUpdated", { detail: result })
          );
        } catch {
          // ignore in non-browser environments
        }

        form.setFieldsValue(result);
        // Fetch lại trang để đảm bảo dữ liệu mới nhất
        await fetchSettings();
      } else {
        notifyCustom("error", { title: "Không thể lưu cài đặt banner" });
      }
    } catch (error) {
      console.error(error);
      notifyCustom("error", { title: "Có lỗi xảy ra khi lưu dữ liệu" });
    } finally {
      setSaving(false);
    }
  };

  return (
    // KHÔNG bọc AdminLayout ở đây nữa để tránh layout lồng nhau
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ margin: 0 }}>
          Banner Settings
        </Title>
        <div className="space-x-2">
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchSettings}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
            loading={saving}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          overlay: {
            enabled: true,
            opacity: 0.85,
            fromColor: "#1E3A8A",
            toColor: "#115E59",
          },
          cta: { visible: true },
        }}
      >
        <Row gutter={24}>
          {/* LEFT COLUMN: CONTENT + CTA */}
          <Col span={16}>
            <Card title="Content" className="mb-6">
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  { required: true, message: "Please enter a title" },
                  { max: 150, message: "Title should be under 150 characters" },
                ]}
              >
                <Input size="large" placeholder="Enter banner title" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter a description" },
                  {
                    max: 500,
                    message: "Description should be under 500 characters",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  showCount
                  maxLength={500}
                  placeholder="Enter banner description"
                />
              </Form.Item>
            </Card>

            <Card title="Call to Action (CTA)" className="mb-6">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={["cta", "label"]}
                    label="Button Label"
                    rules={[
                      { required: true, message: "Please enter button label" },
                      {
                        max: 60,
                        message: "Button label should be under 60 characters",
                      },
                    ]}
                  >
                    <Input placeholder="e.g. Get Started" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={["cta", "link"]}
                    label="Button Link"
                    rules={[
                      { required: true, message: "Please enter button link" },
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();
                          const v = String(value).trim();
                          if (v.startsWith("#")) return Promise.resolve();
                          try {
                            new URL(v);
                            return Promise.resolve();
                          } catch {
                            return Promise.reject(
                              new Error(
                                'Link must be a valid URL (https://...) or start with "#"'
                              )
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <Input placeholder="e.g. #about" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name={["cta", "visible"]}
                label="Show CTA Button"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Card>
          </Col>

          {/* RIGHT COLUMN: BACKGROUND + OVERLAY */}
          <Col span={8}>
            <Card title="Background & Overlay" className="mb-6">
              <Form.Item
                label="Background Image"
                required
                tooltip="Enter a URL or select from the gallery below"
              >
                <Form.Item
                  name="backgroundImage"
                  noStyle
                  rules={[
                    { required: true, message: "Please enter image URL" },
                    {
                      type: "string",
                      max: 255,
                      message: "URL is too long",
                    },
                  ]}
                >
                  <Input 
                    placeholder="/assets/img/hero-bg.jpg" 
                    prefix={<PictureOutlined />} 
                    allowClear
                    addonAfter={
                      <Upload 
                        beforeUpload={onFileChange} 
                        showUploadList={false}
                        accept="image/*"
                      >
                        <Tooltip title="Upload Image">
                            <UploadOutlined className="cursor-pointer hover:text-blue-500" />
                        </Tooltip>
                      </Upload>
                    }
                  />
                </Form.Item>

                {/* Preview */}
                {backgroundImage && (
                  <div className="mt-4 mb-4">
                    <Text type="secondary" className="block mb-2">Preview:</Text>
                    <div className="relative rounded-lg overflow-hidden border border-gray-200" style={{ height: 150 }}>
                      <Image
                        src={backgroundImage}
                        alt="Banner Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        height={150}
                        width="100%"
                        fallback="/assets/img/hero-bg.jpg"
                      />
                    </div>
                  </div>
                )}

                {/* Gallery */}
                <div className="mt-4">
                  <Text type="secondary" className="block mb-2">Quick Select:</Text>
                  <Space wrap>
                    {AVAILABLE_IMAGES.map((img) => (
                      <Tooltip title={img} key={img}>
                        <div 
                          className={`cursor-pointer rounded overflow-hidden border-2 transition-all ${backgroundImage === img ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                          onClick={() => form.setFieldValue('backgroundImage', img)}
                          style={{ width: 60, height: 40 }}
                        >
                          <img 
                            src={img} 
                            alt={img} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        </div>
                      </Tooltip>
                    ))}
                  </Space>
                </div>
              </Form.Item>

              <Divider>Overlay Settings</Divider>

              <Form.Item
                name={["overlay", "enabled"]}
                label="Enable Overlay"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name={["overlay", "fromColor"]}
                label="Gradient Start Color"
              >
                <ColorPicker showText />
              </Form.Item>

              <Form.Item
                name={["overlay", "toColor"]}
                label="Gradient End Color"
              >
                <ColorPicker showText />
              </Form.Item>

              <Form.Item
                name={["overlay", "opacity"]}
                label={
                  <div className="flex justify-between">
                    <span>Opacity</span>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Higher = darker overlay
                    </Text>
                  </div>
                }
              >
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  marks={{ 0: "0%", 0.5: "50%", 1: "100%" }}
                  tooltip={{ formatter: (v) => `${Math.round((v ?? 0) * 100)}%` }}
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>

      <Modal
        title="Crop Image"
        open={isModalOpen}
        onOk={handleSaveCrop}
        onCancel={() => {
            setIsModalOpen(false);
            setImageSrc(null);
        }}
        confirmLoading={uploading}
        width={800}
        destroyOnClose
      >
        <div className="relative w-full h-[400px]">
          <Cropper
            image={imageSrc || ''}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="mt-4">
            <Text>Zoom</Text>
            <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(value) => setZoom(value)}
            />
        </div>
      </Modal>
    </div>
  );
};

export default BannerSettingsPage;
