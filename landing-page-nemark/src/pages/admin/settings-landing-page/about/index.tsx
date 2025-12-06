import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Image,
  Space,
  Tooltip,
  Upload,
  Modal,
  List,
  Select,
  Slider,
} from "antd";
import { notifyCustom } from "../../../../components/notificationsCustom";
import { SaveOutlined, ReloadOutlined, PictureOutlined, UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { AboutSettings, AboutFeature } from "../../../../types/about";
import { getAboutSettings, saveAboutSettings } from "../../../../services/aboutApi";
import { uploadImage } from "../../../../services/bannerApi"; // Reuse upload service
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '../../../../utils/cropImage';
import type { RcFile } from 'antd/es/upload';

const { Title, Text } = Typography;
const { Option } = Select;

const AVAILABLE_ICONS = [
  'DeploymentUnitOutlined',
  'CodeOutlined',
  'CloudServerOutlined',
  'RocketOutlined',
  'SafetyCertificateOutlined',
  'TeamOutlined',
  'GlobalOutlined',
  'MobileOutlined',
];

const AboutSettingsPage: React.FC = () => {
  const [form] = Form.useForm<AboutSettings>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Watch image for preview
  const image = Form.useWatch('image', form);

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
        const file = new File([croppedImageBlob], "about-img.jpg", { type: "image/jpeg" });
        const url = await uploadImage(file);
        if (url) {
          form.setFieldValue('image', url);
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
      const data = await getAboutSettings();

      if (data) {
        form.setFieldsValue(data);
      } else {
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      notifyCustom("error", { title: "Không thể tải cài đặt About" });
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const onFinish = async (values: AboutSettings) => {
    setSaving(true);
    try {
      const result = await saveAboutSettings(values);
      if (result) {
        notifyCustom("success", { title: "Lưu cài đặt About thành công" });
        
        // Broadcast update
        try {
          const channel = new BroadcastChannel('app_settings_channel');
          channel.postMessage('about-updated');
          channel.close();

          window.dispatchEvent(
            new CustomEvent("aboutSettingsUpdated", { detail: result })
          );
        } catch {
          // ignore
        }

        form.setFieldsValue(result);
        await fetchSettings();
      } else {
        notifyCustom("error", { title: "Không thể lưu cài đặt About" });
      }
    } catch (error) {
      console.error(error);
      notifyCustom("error", { title: "Có lỗi xảy ra khi lưu dữ liệu" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ margin: 0 }}>
          Cài đặt Giới Thiệu
        </Title>
        <div className="space-x-2">
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
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={16}>
            <Card title="General Information" className="mb-6">
              <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
              >
                <Input size="large" placeholder="Nhập tiêu đề giới thiệu" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea
                  rows={6}
                  showCount
                  placeholder="Nhập nội dung mô tả giới thiệu"
                />
              </Form.Item>

              <Form.Item
                name="videoUrl"
                label="URL Video (Embed YouTube)"
                rules={[{ required: true, message: "Vui lòng nhập URL video" }]}
              >
                <Input placeholder="https://www.youtube.com/embed/..." />
              </Form.Item>
            </Card>

            <Card title="Danh sách tính năng" className="mb-6">
              <Form.List name="features">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card 
                        key={key} 
                        size="small" 
                        className="mb-4 bg-gray-50"
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
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'icon']}
                                label="Biểu tượng"
                                rules={[{ required: true, message: 'Vui lòng chọn biểu tượng' }]}
                            >
                                <Select placeholder="Chọn biểu tượng">
                                {AVAILABLE_ICONS.map(icon => (
                                  <Option key={icon} value={icon}>{icon}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={16}>
                            <Form.Item
                              {...restField}
                              name={[name, 'title']}
                              label="Tiêu đề"
                              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                            >
                              <Input placeholder="Feature title" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          label="Mô tả"
                          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        >
                          <Input.TextArea rows={2} placeholder="Feature description" />
                        </Form.Item>
                      </Card>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm tính năng
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Ảnh Giới Thiệu" className="mb-6">
              <Form.Item
                label="Image"
                required
                tooltip="Nhập URL hoặc tải ảnh lên"
              >
                <Form.Item
                  name="image"
                  noStyle
                  rules={[{ required: true, message: "Vui lòng nhập URL ảnh" }]}
                >
                  <Input 
                    placeholder="/assets/img/about.jpg" 
                    prefix={<PictureOutlined />} 
                    allowClear
                    addonAfter={
                      <Upload 
                        beforeUpload={onFileChange} 
                        showUploadList={false}
                        accept="image/*"
                      >
                        <Tooltip title="Tải ảnh lên">
                            <UploadOutlined className="cursor-pointer hover:text-blue-500" />
                        </Tooltip>
                      </Upload>
                    }
                  />
                </Form.Item>

                {image && (
                  <div className="mt-4 mb-4">
                    <Text type="secondary" className="block mb-2">Xem trước:</Text>
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={image}
                        alt="About Preview"
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        fallback="/assets/img/about.jpg"
                      />
                    </div>
                  </div>
                )}
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>

      <Modal
        title="Cắt ảnh"
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
            aspect={4 / 3} // Standard aspect ratio for about image
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="mt-4">
            <Text>Phóng/Thu</Text>
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

export default AboutSettingsPage;
