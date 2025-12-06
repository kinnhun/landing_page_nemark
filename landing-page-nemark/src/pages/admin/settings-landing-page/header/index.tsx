import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Row,
  Col,
  Card,
  Tree,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  Popconfirm,
  Typography,
  Upload,
  Slider,
  Select,
  InputNumber,
  Divider,
  message,
} from 'antd';
import type { DataNode } from 'antd/es/tree';
import Image from 'next/image';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Cropper, { Area } from 'react-easy-crop';

import type { MenuItem, HeaderSettings } from '../../../../types/header';
import { getHeaderSettings, saveHeaderSettings } from '../../../../services/headerApi';
import { notifyCustom } from '../../../../components/notificationsCustom';

const { Text } = Typography;
const { Option } = Select;

// Use Cropper directly in JSX
// (we'll reference `Cropper` imported from 'react-easy-crop' below)

/* ------------------------------------------------
 *  HẰNG SỐ & HÀM TIỆN ÍCH
 * ------------------------------------------------ */

const genId = () => `${Date.now()}_${Math.round(Math.random() * 1000)}`;

const REQUIRED_MENU: MenuItem[] = [
  { id: 'hero', label: 'Trang Chủ', link: '#hero', enabled: true },
  { id: 'about', label: 'Giới Thiệu', link: '#about', enabled: true },
  { id: 'services', label: 'Dịch Vụ', link: '#services', enabled: true },
  { id: 'portfolio', label: 'Dự Án', link: '#portfolio', enabled: true },
  { id: 'team', label: 'Đội Ngũ', link: '#team', enabled: true },
];

const isRequiredItem = (id?: string | null) =>
  !!id && REQUIRED_MENU.some((item) => item.id === id);

const cloneMenu = (items: MenuItem[] = []): MenuItem[] =>
  JSON.parse(JSON.stringify(items));

const toTreeData = (items: MenuItem[] = []): DataNode[] =>
  items.map((i) => ({
    title: i.label,
    key: i.id,
    children: toTreeData(i.children || []),
  }));

const updateMenuItem = (
  items: MenuItem[],
  id: string,
  updater: (item: MenuItem) => void
): boolean => {
  for (const item of items) {
    if (item.id === id) {
      updater(item);
      return true;
    }
    if (item.children && updateMenuItem(item.children, id, updater)) {
      return true;
    }
  }
  return false;
};

const addChildToItem = (
  items: MenuItem[],
  parentId: string,
  child: MenuItem
): boolean => {
  for (const item of items) {
    if (item.id === parentId) {
      item.children = item.children || [];
      item.children.push(child);
      return true;
    }
    if (item.children && addChildToItem(item.children, parentId, child)) {
      return true;
    }
  }
  return false;
};

const removeMenuItem = (items: MenuItem[], id: string): MenuItem[] =>
  items
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      children: item.children ? removeMenuItem(item.children, id) : undefined,
    }));

/* ------------------------------------------------
 *  COMPONENT CHÍNH
 * ------------------------------------------------ */

const HeaderSettingPage: React.FC = () => {
  const [settings, setSettings] = useState<HeaderSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  // crop modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const cropperRef = useRef<HTMLDivElement | null>(null);
  const [cropOutputWidth, setCropOutputWidth] = useState<number>(120);
  const [cropOutputHeight, setCropOutputHeight] = useState<number>(40);

  // Khóa tỉ lệ theo kích thước đầu ra để tránh aspect = 0
  const cropAspect =
    cropOutputWidth > 0 && cropOutputHeight > 0
      ? cropOutputWidth / cropOutputHeight
      : 3; // mặc định header 3:1

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    (async () => {
      const s = await getHeaderSettings();
      if (!s) return;

      const merged: HeaderSettings = {
        ...s,
        menu: {
          items: s.menu?.items && s.menu.items.length > 0 ? s.menu.items : REQUIRED_MENU,
        },
        cta: {
          label: s.cta?.label || 'Liên Hệ',
          link: s.cta?.link || '#contact',
          visible: s.cta?.visible !== false,
        },
        logo: {
          url: s.logo?.url || '',
          scrolledUrl: s.logo?.scrolledUrl || '',
          width: s.logo?.width ?? 120,
          height: s.logo?.height ?? 40,
        },
        background: {
          initial: {
            type: s.background?.initial?.type || 'solid',
            color: s.background?.initial?.color || '#0b1220',
            opacity: s.background?.initial?.opacity ?? 1,
            blur: s.background?.initial?.blur ?? 0,
            gradientFrom: s.background?.initial?.gradientFrom || '#000000',
            gradientTo: s.background?.initial?.gradientTo || '#ffffff',
            gradientAngle: s.background?.initial?.gradientAngle ?? 90,
            shadow: s.background?.initial?.shadow ?? false,
          },
          scrolled: {
            type: s.background?.scrolled?.type || 'solid',
            color: s.background?.scrolled?.color || '#ffffff',
            opacity: s.background?.scrolled?.opacity ?? 1,
            blur: s.background?.scrolled?.blur ?? 0,
            gradientFrom: s.background?.scrolled?.gradientFrom || '#ffffff',
            gradientTo: s.background?.scrolled?.gradientTo || '#000000',
            gradientAngle: s.background?.scrolled?.gradientAngle ?? 90,
            shadow: s.background?.scrolled?.shadow ?? false,
          },
        },
        text: {
          defaultColor: s.text?.defaultColor || '#ffffff',
        },
      };

      setSettings(merged);
    })();
  }, []);

  /* ----------------- HANDLERS MENU ----------------- */

  const handleSelect = (keys: React.Key[]) => {
    setSelectedKey((keys[0] as string) || null);
  };

  const handleAddTop = () => {
    if (!settings) return;
    const newItem: MenuItem = {
      id: genId(),
      label: 'Mục mới',
      link: '#',
      enabled: true,
    };

    const next: HeaderSettings = {
      ...settings,
      menu: {
        items: [...(settings.menu?.items || []), newItem],
      },
    };

    setSettings(next);
    setSelectedKey(newItem.id);
    form.setFieldsValue({
      label: newItem.label,
      link: newItem.link,
      enabled: newItem.enabled,
    });
    setModalOpen(true);
  };

  const handleAddChild = () => {
    if (!settings || !selectedKey) {
      message.warning('Hãy chọn một mục để thêm mục con.');
      return;
    }
    if (isRequiredItem(selectedKey)) {
      message.warning('Không thể thêm mục con cho mục bắt buộc.');
      return;
    }

    const newItem: MenuItem = {
      id: genId(),
      label: 'Mục con mới',
      link: '#',
      enabled: true,
    };

    const items = cloneMenu(settings.menu?.items || []);
    addChildToItem(items, selectedKey, newItem);

    const next: HeaderSettings = { ...settings, menu: { items } };
    setSettings(next);
    setSelectedKey(newItem.id);
    form.setFieldsValue({
      label: newItem.label,
      link: newItem.link,
      enabled: newItem.enabled,
    });
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (!settings || !selectedKey) return;
    if (isRequiredItem(selectedKey)) {
      message.warning('Không thể xoá mục bắt buộc.');
      return;
    }

    const items = removeMenuItem(settings.menu?.items || [], selectedKey);
    const next: HeaderSettings = { ...settings, menu: { items } };
    setSettings(next);
    setSelectedKey(null);
  };

  const handleOpenEdit = () => {
    if (!settings || !selectedKey) {
      message.warning('Hãy chọn một mục menu để chỉnh sửa.');
      return;
    }
    if (isRequiredItem(selectedKey)) {
      message.warning('Không thể chỉnh sửa mục bắt buộc.');
      return;
    }

    const findMenuItem = (items: MenuItem[], id: string): MenuItem | null => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (item.children) {
          const found = findMenuItem(item.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const found = findMenuItem(settings.menu?.items || [], selectedKey);

    if (!found) {
      message.error('Không tìm thấy mục cần chỉnh sửa.');
      return;
    }

    form.setFieldsValue({
      label: found.label,
      link: found.link,
      enabled: found.enabled !== false,
    });
    setModalOpen(true);
  };

  const handleSubmitEdit = async () => {
    if (!settings || !selectedKey) return;
    try {
      const values = await form.validateFields();
      const items = cloneMenu(settings.menu?.items || []);

      updateMenuItem(items, selectedKey, (item) => {
        item.label = values.label;
        item.link = values.link;
        item.enabled = values.enabled;
      });

      const next: HeaderSettings = { ...settings, menu: { items } };
      setSettings(next);
      setModalOpen(false);
    } catch {
      // ignore
    }
  };

  /* ----------------- SAVE SETTINGS ----------------- */

  const handleSave = async () => {
    if (!settings) return;

    setLoading(true);
    try {
      const out: HeaderSettings = { ...settings };

      // Luôn giữ các mục bắt buộc ở đầu
      const currentItems = out.menu?.items || [];
      const rest = currentItems.filter(
        (i) => !REQUIRED_MENU.some((r) => r.id === i.id)
      );
      out.menu = { items: [...REQUIRED_MENU, ...rest] };

      // Đảm bảo CTA hợp lệ
      out.cta = {
        label: out.cta?.label || 'Liên Hệ',
        link: out.cta?.link || '#contact',
        visible: out.cta?.visible !== false,
      };

      const saved = await saveHeaderSettings(out);
        if (saved) {
        setSettings(saved);
        try {
          localStorage.setItem(
            'header_settings_updated',
            String(Date.now())
          );
          window.dispatchEvent(new Event('header_settings_updated'));
        } catch {
          // ignore
        }

        notifyCustom('success', {
          title: 'Lưu thành công',
          description: 'Cài đặt header đã được cập nhật.',
        });
      } else {
        notifyCustom('error', {
          title: 'Lưu thất bại',
          description: 'Không thể lưu cài đặt header.',
        });
      }
    } catch (err) {
      notifyCustom('error', {
        title: 'Lỗi lưu dữ liệu',
        description: String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------- UPLOAD LOGO ----------------- */

const uploadProps = {
  beforeUpload: (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = String(e.target?.result || '');

      // lấy kích thước hiện tại hoặc set mặc định
      const currentWidth = settings?.logo?.width ?? 120;
      const currentHeight = settings?.logo?.height ?? 40;

      // cập nhật settings.logo
      setSettings((prev: HeaderSettings | null) => ({
        ...(prev || {}),
        logo: {
          ...(prev?.logo || {}),
          url,
          width: currentWidth,
          height: currentHeight,
        },
      }));

      // đồng bộ state cho cropper
      setImageToCrop(url);
      setCropOutputWidth(currentWidth);
      setCropOutputHeight(currentHeight);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setCropModalOpen(true); // mở modal crop ngay sau khi chọn ảnh
    };

    reader.readAsDataURL(file);
    return false; // không upload thật lên server
  },
  showUploadList: false,
  accept: 'image/*',
};
  /* ----------------- CROP LOGO ----------------- */

  const onCropComplete = useCallback((_: Area, croppedAreaPixelsArg: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsArg);
  }, []);

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  outputWidth?: number,
  outputHeight?: number
) {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img as HTMLImageElement);
    img.onerror = (e) => reject(e);
    img.src = imageSrc;
  });

  const safeCropWidth = Math.max(1, pixelCrop.width);
  const safeCropHeight = Math.max(1, pixelCrop.height);

  const destW = Math.max(1, Math.round(outputWidth ?? safeCropWidth));
  const destH = Math.max(1, Math.round(outputHeight ?? safeCropHeight));

  const canvas = document.createElement('canvas');
  canvas.width = destW;
  canvas.height = destH;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Không thể khởi tạo canvas');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    safeCropWidth,
    safeCropHeight,
    0,
    0,
    destW,
    destH
  );

  return canvas.toDataURL('image/png');
}



const handleOpenCropper = () => {
  const url = settings?.logo?.url || imageToCrop;
  if (!url) {
    message.warning('Vui lòng tải logo trước khi chỉnh sửa.');
    return;
  }

  const w = settings?.logo?.width ?? cropOutputWidth ?? 120;
  const h = settings?.logo?.height ?? cropOutputHeight ?? 40;

  setImageToCrop(url);
  setCropOutputWidth(w);
  setCropOutputHeight(h);
  setCrop({ x: 0, y: 0 });
  setZoom(1);
  setCroppedAreaPixels(null);
  setCropModalOpen(true);
};

const handleSaveCrop = async () => {
  if (!imageToCrop) {
    message.error('Không có hình ảnh để cắt.');
    return;
  }
  if (!croppedAreaPixels) {
    message.warning('Vui lòng chọn vùng cắt trên hình ảnh.');
    return;
  }

  try {
    const targetWidth = Math.max(40, Math.round(cropOutputWidth || 120));
    const targetHeight = Math.max(20, Math.round(cropOutputHeight || 40));

    const dataUrl = await getCroppedImg(
      imageToCrop,
      croppedAreaPixels,
      targetWidth,
      targetHeight
    );

    setSettings((prev: HeaderSettings | null) => ({
      ...(prev || {}),
      logo: {
        ...(prev?.logo || {}),
        url: dataUrl,
        width: targetWidth,
        height: targetHeight,
      },
    }));

    setCropModalOpen(false);
    notifyCustom('success', {
      title: 'Đã cập nhật logo',
      description: 'Logo đã được cắt và áp dụng.',
    });
  } catch (err) {
    notifyCustom('error', {
      title: 'Lỗi cắt logo',
      description: String(err),
    });
  }
};

  /* ----------------- PREVIEW ----------------- */

  if (!settings) return <div>Đang tải cài đặt...</div>;

  const previewHeader = (
    <div
      style={{
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: settings.background?.initial?.color || '#0b1220',
        color: settings.text?.defaultColor || '#ffffff',
        borderRadius: 6,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {settings.logo?.url ? (
          <Image
            src={settings.logo.url}
            alt="Logo"
            width={settings.logo?.width || 120}
            height={settings.logo?.height || 40}
          />
        ) : (
          <span style={{ fontWeight: 700 }}>NEMARK</span>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          {(settings.menu?.items || [])
            .filter((i) => i.enabled !== false)
            .map((item) => (
              <span key={item.id}>{item.label}</span>
            ))}
        </div>
      </div>
      {settings.cta?.visible !== false && (
        <a
          href={settings.cta?.link || '#contact'}
          style={{
            background: '#1677ff',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: 6,
          }}
        >
          {settings.cta?.label || 'Liên Hệ'}
        </a>
      )}
    </div>
  );

  /* ------------------------------------------------
   *  JSX CHÍNH: LAYOUT 2 CỘT RÕ RÀNG
   * ------------------------------------------------ */

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={16} align="stretch">
        {/* Cột trái: Menu + Nâng cao */}
        <Col span={16}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Card
              title="Trình chỉnh sửa menu"
              extra={
                <Space>
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={handleAddTop}
                  >
                    Thêm mục
                  </Button>
                  <Button
                    onClick={handleAddChild}
                    disabled={!selectedKey}
                  >
                    Thêm mục con
                  </Button>
                  <Button
                    onClick={handleOpenEdit}
                    disabled={!selectedKey || isRequiredItem(selectedKey)}
                  >
                    Chỉnh sửa
                  </Button>
                  <Popconfirm
                    title="Bạn có chắc muốn xoá mục này?"
                    onConfirm={handleDelete}
                    disabled={!selectedKey || isRequiredItem(selectedKey)}
                  >
                    <Button
                      danger
                      disabled={!selectedKey || isRequiredItem(selectedKey)}
                    >
                      Xoá
                    </Button>
                  </Popconfirm>
                </Space>
              }
            >
              <Tree
                blockNode
                selectable
                onSelect={handleSelect}
                treeData={toTreeData(settings.menu?.items || [])}
                defaultExpandAll
              />
            </Card>

            <Card title="Nâng cao">
              <Form layout="vertical">
                <Form.Item label="Hiển thị nút CTA">
                  <Switch
                    checked={settings.cta?.visible !== false}
                    onChange={(visible) =>
                      setSettings({
                        ...settings,
                        cta: { ...(settings.cta || {}), visible },
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Nhãn CTA">
                  <Input
                    value={settings.cta?.label}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        cta: { ...(settings.cta || {}), label: e.target.value },
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Liên kết CTA">
                  <Input
                    value={settings.cta?.link}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        cta: { ...(settings.cta || {}), link: e.target.value },
                      })
                    }
                  />
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </Col>

        {/* Cột phải: Preview + Logo + Nền */}
        <Col span={8}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Card title="Xem trước">
              {previewHeader}
            </Card>

            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🎨</span>
                  <span>Logo & Màu chữ</span>
                </div>
              }
              size="small"
            >
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {/* Logo preview and upload */}
                <div style={{ 
                  background: '#fafafa', 
                  padding: 16, 
                  borderRadius: 8,
                  border: '1px dashed #d9d9d9',
                  textAlign: 'center'
                }}>
                  {settings.logo?.url ? (
                    <div style={{ marginBottom: 12 }}>
                      <Image
                        src={settings.logo.url}
                        alt="Logo preview"
                        width={settings.logo?.width || 120}
                        height={settings.logo?.height || 40}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <div style={{ 
                      padding: '20px 0', 
                      color: '#999',
                      fontSize: 13
                    }}>
                      Chưa có logo
                    </div>
                  )}
                  
                  <Space>
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />} type="primary">
                        {settings.logo?.url ? 'Đổi logo' : 'Tải logo'}
                      </Button>
                    </Upload>
                    
                    {settings.logo?.url && (
                      <Button 
                        onClick={handleOpenCropper}
                        icon={<span>✂️</span>}
                      >
                        Chỉnh sửa
                      </Button>
                    )}
                  </Space>
                </div>

                {/* Text color */}
                <div style={{ 
                  background: '#fff', 
                  padding: '12px 16px', 
                  borderRadius: 6,
                  border: '1px solid #e8e8e8'
                }}>
                  <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                    Màu chữ mặc định
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Input
                      type="color"
                      value={settings.text?.defaultColor || '#ffffff'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          text: {
                            ...(settings.text || {}),
                            defaultColor: e.target.value,
                          },
                        })
                      }
                      style={{ width: 60, height: 36 }}
                    />
                    <Input
                      value={settings.text?.defaultColor || '#ffffff'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          text: {
                            ...(settings.text || {}),
                            defaultColor: e.target.value,
                          },
                        })
                      }
                      placeholder="#ffffff"
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              </Space>
            </Card>

            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🌅</span>
                  <span>Nền header (Đầu trang)</span>
                </div>
              }
              size="small"
            >
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>Loại</Text>
                  <Select
                    value={settings.background?.initial?.type || 'solid'}
                    onChange={(v: 'solid' | 'gradient' | 'transparent') =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          initial: {
                            ...(settings.background?.initial || {}),
                            type: v,
                          },
                        },
                      })
                    }
                    style={{ width: '100%', marginTop: 4 }}
                  >
                    <Option value="solid">Màu</Option>
                    <Option value="gradient">Gradient</Option>
                    <Option value="transparent">Trong suốt</Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <Text>Độ mờ</Text>
                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={settings.background?.initial?.opacity ?? 1}
                    onChange={(v) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          initial: {
                            ...(settings.background?.initial || {}),
                            opacity: v,
                          },
                        },
                      })
                    }
                  />
                </Col>

                <Col span={12}>
                  <Text>Màu</Text>
                  <Input
                    type="color"
                    value={settings.background?.initial?.color || '#000000'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          initial: {
                            ...(settings.background?.initial || {}),
                            color: e.target.value,
                          },
                        },
                      })
                    }
                    style={{ width: 60, marginTop: 4 }}
                  />
                </Col>
                <Col span={12}>
                  <Text>Blur (px)</Text>
                  <InputNumber
                    min={0}
                    value={settings.background?.initial?.blur ?? 0}
                    onChange={(v) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          initial: {
                            ...(settings.background?.initial || {}),
                            blur: Number(v || 0),
                          },
                        },
                      })
                    }
                    style={{ width: '100%', marginTop: 4 }}
                  />
                </Col>

                <Col span={12}>
                  <Text>Gradient từ</Text>
                  <Input
                    type="color"
                    value={
                      settings.background?.initial?.gradientFrom || '#000000'
                    }
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          initial: {
                            ...(settings.background?.initial || {}),
                            gradientFrom: e.target.value,
                          },
                        },
                      })
                    }
                    style={{ width: 60, marginTop: 4 }}
                  />
                </Col>
                <Col span={12}>
                  <Text>Gradient đến</Text>
                  <Input
                    type="color"
                    value={
                      settings.background?.initial?.gradientTo || '#ffffff'
                    }
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          initial: {
                            ...(settings.background?.initial || {}),
                            gradientTo: e.target.value,
                          },
                        },
                      })
                    }
                    style={{ width: 60, marginTop: 4 }}
                  />
                </Col>

                <Col span={12}>
                  <Text>Góc (độ)</Text>
                  <InputNumber
                    min={0}
                    max={360}
                    value={settings.background?.initial?.gradientAngle ?? 90}
                    onChange={(v) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          initial: {
                            ...(settings.background?.initial || {}),
                            gradientAngle: Number(v || 0),
                          },
                        },
                      })
                    }
                    style={{ width: '100%', marginTop: 4 }}
                  />
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Text>Bóng</Text>
                  <Switch
                    checked={!!settings.background?.initial?.shadow}
                    onChange={(shadow) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          initial: {
                            ...(settings.background?.initial || {}),
                            shadow,
                          },
                        },
                      })
                    }
                  />
                </Col>
              </Row>
            </Card>

            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🌊</span>
                  <span>Nền header (Khi cuộn)</span>
                </div>
              }
              size="small"
            >
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Text>Loại</Text>
                  <Select
                    value={settings.background?.scrolled?.type || 'solid'}
                    onChange={(v: 'solid' | 'gradient' | 'transparent') =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          scrolled: {
                            ...(settings.background?.scrolled || {}),
                            type: v,
                          },
                        },
                      })
                    }
                    style={{ width: '100%', marginTop: 4 }}
                  >
                    <Option value="solid">Màu</Option>
                    <Option value="gradient">Gradient</Option>
                    <Option value="transparent">Trong suốt</Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <Text>Độ mờ</Text>
                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={settings.background?.scrolled?.opacity ?? 1}
                    onChange={(v) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          scrolled: {
                            ...(settings.background?.scrolled || {}),
                            opacity: v,
                          },
                        },
                      })
                    }
                  />
                </Col>

                <Col span={12}>
                  <Text>Màu</Text>
                  <Input
                    type="color"
                    value={settings.background?.scrolled?.color || '#ffffff'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          scrolled: {
                            ...(settings.background?.scrolled || {}),
                            color: e.target.value,
                          },
                        },
                      })
                    }
                    style={{ width: 60, marginTop: 4 }}
                  />
                </Col>
                <Col span={12}>
                  <Text>Blur (px)</Text>
                  <InputNumber
                    min={0}
                    value={settings.background?.scrolled?.blur ?? 0}
                    onChange={(v) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          scrolled: {
                            ...(settings.background?.scrolled || {}),
                            blur: Number(v || 0),
                          },
                        },
                      })
                    }
                    style={{ width: '100%', marginTop: 4 }}
                  />
                </Col>

                <Col span={12}>
                  <Text>Gradient từ</Text>
                  <Input
                    type="color"
                    value={
                      settings.background?.scrolled?.gradientFrom || '#ffffff'
                    }
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          scrolled: {
                            ...(settings.background?.scrolled || {}),
                            gradientFrom: e.target.value,
                          },
                        },
                      })
                    }
                    style={{ width: 60, marginTop: 4 }}
                  />
                </Col>
                <Col span={12}>
                  <Text>Gradient đến</Text>
                  <Input
                    type="color"
                    value={
                      settings.background?.scrolled?.gradientTo || '#000000'
                    }
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          scrolled: {
                            ...(settings.background?.scrolled || {}),
                            gradientTo: e.target.value,
                          },
                        },
                      })
                    }
                    style={{ width: 60, marginTop: 4 }}
                  />
                </Col>

                <Col span={12}>
                  <Text>Góc (độ)</Text>
                  <InputNumber
                    min={0}
                    max={360}
                    value={settings.background?.scrolled?.gradientAngle ?? 90}
                    onChange={(v) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          scrolled: {
                            ...(settings.background?.scrolled || {}),
                            gradientAngle: Number(v || 0),
                          },
                        },
                      })
                    }
                    style={{ width: '100%', marginTop: 4 }}
                  />
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Text>Bóng</Text>
                  <Switch
                    checked={!!settings.background?.scrolled?.shadow}
                    onChange={(shadow) =>
                      setSettings({
                        ...settings,
                        background: {
                          ...settings.background,
                          scrolled: {
                            ...(settings.background?.scrolled || {}),
                            shadow,
                          },
                        },
                      })
                    }
                  />
                </Col>
              </Row>
            </Card>

            <Card size="small" bordered={false}>
              <Space>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleSave}
                >
                  Lưu
                </Button>
                <Button onClick={() => window.location.reload()}>Hủy</Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>

      {/* Modal chỉnh sửa menu */}
      <Modal
        title="Chỉnh sửa mục menu"
        open={modalOpen}
        onOk={handleSubmitEdit}
        onCancel={() => setModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="label"
            label="Tên hiển thị"
            rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="link" label="Liên kết">
            <Input />
          </Form.Item>
          <Form.Item
            name="enabled"
            label="Hiển thị"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal chỉnh sửa/crop logo */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UploadOutlined style={{ fontSize: 18 }} />
            <span>Chỉnh sửa Logo</span>
          </div>
        }
        open={cropModalOpen}
        onOk={handleSaveCrop}
        onCancel={() => setCropModalOpen(false)}
        okText="Áp dụng"
        cancelText="Hủy"
        width={900}
        centered
      >
        <div style={{ padding: '12px 0' }}>
          {/* Crop area */}
          <div 
            style={{ 
              position: 'relative', 
              height: 450, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }} 
            ref={cropperRef}
          >
            {imageToCrop ? (
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={cropAspect}
                onCropChange={(c: { x: number; y: number }) => setCrop(c)}
                onZoomChange={(z: number) => setZoom(z)}
                onCropComplete={onCropComplete}
              />
            ) : (
              <div style={{ 
                color: '#fff', 
                padding: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                fontSize: 16
              }}>
                Không có hình ảnh để chỉnh sửa
              </div>
            )}
          </div>

          {/* Controls */}
          <Card 
            size="small" 
            style={{ 
              marginTop: 16,
              borderRadius: 8,
              background: '#fafafa'
            }}
          >
            <Row gutter={[16, 16]}>
              {/* Zoom control */}
              <Col span={24}>
                <div>
                  <Text strong style={{ fontSize: 13, color: '#595959' }}>
                    🔍 Phóng to / Thu nhỏ
                  </Text>
                  <Slider
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(v) => setZoom(Number(v))}
                    tooltip={{ formatter: (value) => `${Math.round((value ?? 1) * 100)}%` }}
                    style={{ marginTop: 8 }}
                  />
                </div>
              </Col>

              <Col span={24}>
                <Divider style={{ margin: '8px 0' }} />
              </Col>

              {/* Dimensions */}
              <Col span={24}>
                <Text strong style={{ fontSize: 13, color: '#595959', display: 'block', marginBottom: 12 }}>
                  📐 Kích thước đầu ra
                </Text>
                <Row gutter={12}>
                  <Col span={12}>
                    <div style={{ 
                      background: '#fff', 
                      padding: '12px 16px', 
                      borderRadius: 6,
                      border: '1px solid #e8e8e8'
                    }}>
                      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>
                        Chiều rộng (px)
                      </Text>
                      <InputNumber
                        min={40}
                        max={800}
                        value={cropOutputWidth}
                        onChange={(v) => setCropOutputWidth(Number(v || 120))}
                        style={{ width: '100%' }}
                        size="large"
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ 
                      background: '#fff', 
                      padding: '12px 16px', 
                      borderRadius: 6,
                      border: '1px solid #e8e8e8'
                    }}>
                      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>
                        Chiều cao (px)
                      </Text>
                      <InputNumber
                        min={20}
                        max={600}
                        value={cropOutputHeight}
                        onChange={(v) => setCropOutputHeight(Number(v || 40))}
                        style={{ width: '100%' }}
                        size="large"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>

              {/* Info hint */}
              <Col span={24}>
                <div style={{ 
                  background: '#e6f7ff', 
                  padding: '8px 12px', 
                  borderRadius: 6,
                  border: '1px solid #91d5ff',
                  fontSize: 12,
                  color: '#096dd9'
                }}>
                  💡 <strong>Mẹo:</strong> Kéo để di chuyển, cuộn chuột để phóng to/thu nhỏ. Điều chỉnh kích thước để logo vừa với header.
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderSettingPage;
