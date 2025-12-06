import React, { useEffect, useState, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  Popconfirm,
  Typography,
  Upload,
  Select,
  InputNumber,
  Table,
  Tag,
  message,
  Slider,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Cropper, { Area } from "react-easy-crop";

import type {
  PortfolioSettings,
  PortfolioItem,
} from "../../../../types/portfolio";
import {
  getPortfolioSettings,
  savePortfolioSettings,
} from "../../../../services/portfolioApi";
import { notifyCustom } from "../../../../components/notificationsCustom";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

/* ------------------------------------------------
 *  HẰNG SỐ & HÀM TIỆN ÍCH
 * ------------------------------------------------ */

// Validation limits
const TITLE_MAX = 100;
const DESC_MAX = 300;
const LABEL_MAX = 50;
const LINK_MAX = 200;
const UPLOAD_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB

const isUrlOrHash = (value?: string | null) => {
  if (!value) return false;
  const v = value.trim();
  if (v.startsWith("#")) return v.length > 1;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
};

/* ------------------------------------------------
 *  COMPONENT CHÍNH
 * ------------------------------------------------ */

const PortfolioSettingPage: React.FC = () => {
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | string | null>(
    null
  );
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(
    null
  );
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();

  // Crop modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropOutputWidth, setCropOutputWidth] = useState<number>(800);
  const [cropOutputHeight, setCropOutputHeight] = useState<number>(600);
  const [cropForItemId, setCropForItemId] = useState<number | string | null>(
    null
  );

  const cropAspect =
    cropOutputWidth > 0 && cropOutputHeight > 0
      ? cropOutputWidth / cropOutputHeight
      : 4 / 3;

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const s = await getPortfolioSettings();
        if (s) {
          setSettings({
            ...s,
            categories: s.categories || [],
            items: s.items || [],
            visible: s.visible !== false,
            columns: s.columns || 3,
            showFilter: s.showFilter !== false,
            enableAnimation: s.enableAnimation !== false,
          });
        }
      } catch (err) {
        console.error("Error loading portfolio settings:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ----------------- HANDLERS CATEGORIES ----------------- */

  const handleAddCategory = () => {
    setSelectedCategoryKey(null);
    categoryForm.resetFields();
    categoryForm.setFieldsValue({
      key: "",
      label: "",
    });
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (key: string) => {
    const cat = settings?.categories?.find((c) => c.key === key);
    if (!cat) return;
    setSelectedCategoryKey(key);
    categoryForm.setFieldsValue({
      key: cat.key,
      label: cat.label,
    });
    setCategoryModalOpen(true);
  };

  const handleDeleteCategory = (key: string) => {
    if (!settings) return;
    if (key === "*") {
      message.warning("Không thể xóa category 'Tất Cả'.");
      return;
    }

    // Check if any items use this category
    const hasItems = settings.items?.some((item) => item.category === key);
    if (hasItems) {
      message.warning(
        "Không thể xóa category này vì có dự án đang sử dụng."
      );
      return;
    }

    const next: PortfolioSettings = {
      ...settings,
      categories: settings.categories?.filter((c) => c.key !== key) || [],
    };
    setSettings(next);
  };

  const handleSubmitCategory = async () => {
    if (!settings) return;
    try {
      const values = await categoryForm.validateFields();
      const categories = [...(settings.categories || [])];

      // Validate key format
      if (!/^[a-z0-9_-]+$/i.test(values.key)) {
        message.error("Key chỉ được chứa chữ, số, _ và -");
        return;
      }

      if (selectedCategoryKey) {
        // Edit existing
        const index = categories.findIndex((c) => c.key === selectedCategoryKey);
        if (index >= 0) {
          // Check if key changed and if new key exists
          if (values.key !== selectedCategoryKey) {
            const keyExists = categories.some((c) => c.key === values.key);
            if (keyExists) {
              message.error("Key này đã tồn tại.");
              return;
            }
            // Update items with old category key
            const items = (settings.items || []).map((item) =>
              item.category === selectedCategoryKey
                ? { ...item, category: values.key }
                : item
            );
            setSettings({ ...settings, items });
          }
          categories[index] = { key: values.key, label: values.label };
          message.success("Đã cập nhật danh mục.");
        }
      } else {
        // Add new
        const keyExists = categories.some((c) => c.key === values.key);
        if (keyExists) {
          message.error("Key này đã tồn tại.");
          return;
        }
        categories.push({ key: values.key, label: values.label });
        message.success("Đã thêm danh mục mới.");
      }

      setSettings({ ...settings, categories });
      setCategoryModalOpen(false);
      categoryForm.resetFields();
    } catch {
      // ignore validation errors
    }
  };

  /* ----------------- HANDLERS ITEMS ----------------- */

  const handleAddItem = () => {
    setSelectedItemId(null);
    form.resetFields();
    const firstCategory =
      settings?.categories?.find((c) => c.key !== "*")?.key || "app";
    form.setFieldsValue({
      title: "",
      desc: "",
      category: firstCategory,
      img: "",
      link: "",
      enabled: true,
    });
    setItemModalOpen(true);
  };

  const handleEditItem = (id: number | string) => {
    const item = settings?.items?.find((i) => i.id === id);
    if (!item) return;
    setSelectedItemId(id);
    form.setFieldsValue({
      title: item.title,
      desc: item.desc,
      category: item.category,
      img: item.img,
      link: item.link || "",
      enabled: item.enabled !== false,
    });
    setItemModalOpen(true);
  };

  const handleDeleteItem = (id: number | string) => {
    if (!settings) return;
    const items = (settings.items || []).filter((i) => i.id !== id);
    setSettings({ ...settings, items });
  };

  const handleSubmitItem = async () => {
    if (!settings) return;
    try {
      const values = await form.validateFields();
      const items = [...(settings.items || [])];

      // Validate category exists
      const categoryExists = settings.categories?.some(
        (c) => c.key === values.category
      );
      if (!categoryExists) {
        message.error("Category không tồn tại. Vui lòng chọn category hợp lệ.");
        return;
      }

      // Validate image
      if (!values.img || values.img.trim().length === 0) {
        message.error("Vui lòng nhập URL ảnh hoặc upload ảnh.");
        return;
      }

      if (selectedItemId) {
        // Edit existing
        const index = items.findIndex((i) => i.id === selectedItemId);
        if (index >= 0) {
          items[index] = {
            ...items[index],
            title: values.title.trim(),
            desc: values.desc.trim(),
            category: values.category,
            img: values.img.trim(),
            link: values.link?.trim() || undefined,
            enabled: values.enabled,
          };
          message.success("Đã cập nhật dự án.");
        }
      } else {
        // Add new
        const newId =
          Math.max(...items.map((i) => (typeof i.id === "number" ? i.id : 0)), 0) +
          1;
        items.push({
          id: newId,
          title: values.title.trim(),
          desc: values.desc.trim(),
          category: values.category,
          img: values.img.trim(),
          link: values.link?.trim() || undefined,
          enabled: values.enabled !== false,
        });
        message.success("Đã thêm dự án mới.");
      }

      setSettings({ ...settings, items });
      setItemModalOpen(false);
      form.resetFields();
    } catch {
      // ignore validation errors
    }
  };

  /* ----------------- UPLOAD IMAGE ----------------- */

  const uploadProps = {
    beforeUpload: (file: File, itemId?: number | string) => {
      if (file.size && file.size > UPLOAD_SIZE_LIMIT) {
        message.error(
          "Kích thước file quá lớn. Vui lòng chọn ảnh nhỏ hơn 5MB."
        );
        return Upload.LIST_IGNORE as unknown as boolean;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = String(e.target?.result || "");
        if (itemId) {
          setCropForItemId(itemId);
        }
        setImageToCrop(url);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
      return false;
    },
    showUploadList: false,
    accept: "image/*",
  };

  /* ----------------- CROP IMAGE ----------------- */

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
      const img = document.createElement("img");
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img as HTMLImageElement);
      img.onerror = (e) => reject(e);
      img.src = imageSrc;
    });

    const safeCropWidth = Math.max(1, pixelCrop.width);
    const safeCropHeight = Math.max(1, pixelCrop.height);

    const destW = Math.max(1, Math.round(outputWidth ?? safeCropWidth));
    const destH = Math.max(1, Math.round(outputHeight ?? safeCropHeight));

    const canvas = document.createElement("canvas");
    canvas.width = destW;
    canvas.height = destH;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Không thể khởi tạo canvas");

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

    return canvas.toDataURL("image/png");
  }

  const handleSaveCrop = async () => {
    if (!imageToCrop || !croppedAreaPixels) {
      message.warning("Vui lòng chọn vùng cắt trên hình ảnh.");
      return;
    }

    try {
      const targetWidth = Math.min(
        2000,
        Math.max(200, Math.round(cropOutputWidth || 800))
      );
      const targetHeight = Math.min(
        2000,
        Math.max(200, Math.round(cropOutputHeight || 600))
      );

      const dataUrl = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels,
        targetWidth,
        targetHeight
      );

      if (cropForItemId && settings) {
        // Update item image
        const items = (settings.items || []).map((item) =>
          item.id === cropForItemId ? { ...item, img: dataUrl } : item
        );
        setSettings({ ...settings, items });
        form.setFieldsValue({ img: dataUrl });
      }

      setCropModalOpen(false);
      setCropForItemId(null);
      notifyCustom("success", {
        title: "Đã cập nhật ảnh",
        description: "Ảnh đã được cắt và áp dụng.",
      });
    } catch (err) {
      notifyCustom("error", {
        title: "Lỗi cắt ảnh",
        description: String(err),
      });
    }
  };

  /* ----------------- SAVE SETTINGS ----------------- */

  const handleSave = async () => {
    if (!settings) return;

    // Validation
    if (!settings.title || settings.title.trim().length === 0) {
      message.error("Vui lòng nhập tiêu đề section.");
      return;
    }

    if (settings.title.length > TITLE_MAX) {
      message.error(`Tiêu đề không được vượt quá ${TITLE_MAX} ký tự.`);
      return;
    }

    if (!settings.categories || settings.categories.length === 0) {
      message.error("Phải có ít nhất một category.");
      return;
    }

    // Validate all items have valid categories
    const categoryKeys = settings.categories.map((c) => c.key);
    const invalidItems = (settings.items || []).filter(
      (item) => !categoryKeys.includes(item.category)
    );
    if (invalidItems.length > 0) {
      message.error(
        `Có ${invalidItems.length} dự án có category không hợp lệ. Vui lòng kiểm tra lại.`
      );
      return;
    }

    // Validate all items have images
    const itemsWithoutImage = (settings.items || []).filter(
      (item) => !item.img || item.img.trim().length === 0
    );
    if (itemsWithoutImage.length > 0) {
      message.warning(
        `Có ${itemsWithoutImage.length} dự án chưa có ảnh. Bạn có muốn tiếp tục?`
      );
      // Continue anyway, just warn
    }

    setLoading(true);
    try {
      const saved = await savePortfolioSettings(settings);
      if (saved) {
        setSettings(saved);
        try {
          localStorage.setItem(
            "portfolio_settings_updated",
            String(Date.now())
          );
          window.dispatchEvent(new Event("portfolio_settings_updated"));

          const channel = new BroadcastChannel("app_settings_channel");
          channel.postMessage("portfolio-updated");
          channel.close();
        } catch {
          // ignore
        }

        notifyCustom("success", {
          title: "Lưu thành công",
          description: "Cài đặt portfolio đã được cập nhật.",
        });
      } else {
        notifyCustom("error", {
          title: "Lưu thất bại",
          description: "Không thể lưu cài đặt portfolio.",
        });
      }
    } catch (err) {
      notifyCustom("error", {
        title: "Lỗi lưu dữ liệu",
        description: String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------- TABLE COLUMNS ----------------- */

  const itemColumns: ColumnsType<PortfolioItem> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Ảnh",
      key: "img",
      width: 100,
      render: (_, record) => (
        <div style={{ width: 80, height: 60, position: "relative" }}>
          {record.img ? (
            <Image
              src={record.img}
              alt={record.title}
              fill
              style={{ objectFit: "cover", borderRadius: 4 }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#999",
              }}
            >
              No img
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (cat) => {
        const category = settings?.categories?.find((c) => c.key === cat);
        return (
          <Tag color="blue">{category?.label || cat}</Tag>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "enabled",
      key: "enabled",
      width: 100,
      render: (enabled) => (
        <Tag color={enabled !== false ? "green" : "red"}>
          {enabled !== false ? "Hiển thị" : "Ẩn"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditItem(record.id)}
            size="small"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa dự án này?"
            onConfirm={() => handleDeleteItem(record.id)}
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!settings) return <div>Đang tải cài đặt...</div>;

  const filteredItems = settings.items?.filter(
    (item) => item.enabled !== false
  ) || [];

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={16} align="stretch">
        {/* Cột trái: Quản lý */}
        <Col span={16}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {/* General Settings */}
            <Card 
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>⚙️</span>
                  <span>Cài đặt chung</span>
                </div>
              }
            >
              <Form layout="vertical">
                <Form.Item 
                  label="Tiêu đề section"
                  help={`${(settings.title || "").length}/${TITLE_MAX} ký tự`}
                >
                  <Input
                    value={settings.title}
                    maxLength={TITLE_MAX}
                    onChange={(e) =>
                      setSettings({ ...settings, title: e.target.value })
                    }
                    placeholder="Dự Án Tiêu Biểu"
                    showCount
                  />
                </Form.Item>
                <Form.Item 
                  label="Mô tả"
                  help={`${(settings.description || "").length}/${DESC_MAX} ký tự`}
                >
                  <TextArea
                    value={settings.description}
                    maxLength={DESC_MAX}
                    rows={3}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        description: e.target.value,
                      })
                    }
                    placeholder="Mô tả về portfolio..."
                    showCount
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Số cột">
                      <InputNumber
                        min={1}
                        max={4}
                        value={settings.columns}
                        onChange={(v) =>
                          setSettings({ ...settings, columns: Number(v) || 3 })
                        }
                        style={{ width: "100%" }}
                        addonAfter="cột"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Hiển thị section">
                      <Switch
                        checked={settings.visible !== false}
                        onChange={(visible) =>
                          setSettings({ ...settings, visible })
                        }
                      />
                      <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                        {settings.visible !== false ? "Đang hiển thị" : "Đang ẩn"}
                      </Text>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Hiển thị bộ lọc">
                      <Switch
                        checked={settings.showFilter !== false}
                        onChange={(showFilter) =>
                          setSettings({ ...settings, showFilter })
                        }
                      />
                      <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                        {settings.showFilter !== false ? "Đang hiển thị" : "Đang ẩn"}
                      </Text>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>

            {/* Categories */}
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>📁</span>
                  <span>Danh mục</span>
                  <Tag color="blue" style={{ marginLeft: 8 }}>
                    {settings.categories?.length || 0}
                  </Tag>
                </div>
              }
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddCategory}
                >
                  Thêm danh mục
                </Button>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                {settings.categories?.map((cat) => (
                  <div
                    key={cat.key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 12,
                      background: "#fafafa",
                      borderRadius: 6,
                    }}
                  >
                    <div>
                      <Tag color="blue">{cat.key}</Tag>
                      <Text strong>{cat.label}</Text>
                    </div>
                    <Space>
                      <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEditCategory(cat.key)}
                        disabled={cat.key === "*"}
                      >
                        Sửa
                      </Button>
                      <Popconfirm
                        title="Bạn có chắc muốn xóa danh mục này?"
                        onConfirm={() => handleDeleteCategory(cat.key)}
                        disabled={cat.key === "*"}
                      >
                        <Button
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          disabled={cat.key === "*"}
                        >
                          Xóa
                        </Button>
                      </Popconfirm>
                    </Space>
                  </div>
                ))}
              </Space>
            </Card>

            {/* Items */}
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🎨</span>
                  <span>Dự án</span>
                  <Tag color="green" style={{ marginLeft: 8 }}>
                    {settings.items?.length || 0}
                  </Tag>
                  <Tag color="default" style={{ marginLeft: 4 }}>
                    Hiển thị: {filteredItems.length}
                  </Tag>
                </div>
              }
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddItem}
                >
                  Thêm dự án
                </Button>
              }
            >
              <Table
                columns={itemColumns}
                dataSource={settings.items || []}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                size="small"
              />
            </Card>
          </Space>
        </Col>

        {/* Cột phải: Preview */}
        <Col span={8}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card title="Xem trước">
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <Title level={4}>{settings.title || "Dự Án Tiêu Biểu"}</Title>
                <Text type="secondary">{settings.description || ""}</Text>
              </div>

              {settings.showFilter !== false && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 16,
                    justifyContent: "center",
                  }}
                >
                  {settings.categories?.map((cat) => (
                    <Tag key={cat.key} color="blue">
                      {cat.label}
                    </Tag>
                  ))}
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${settings.columns || 3}, 1fr)`,
                  gap: 8,
                }}
              >
                {filteredItems.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      aspectRatio: "4/3",
                      position: "relative",
                      borderRadius: 8,
                      overflow: "hidden",
                      background: "#f0f0f0",
                    }}
                  >
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: "#999",
                        }}
                      >
                        No image
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div style={{ textAlign: "center", padding: 20, color: "#999" }}>
                  Chưa có dự án nào
                </div>
              )}
            </Card>

            <Card size="small" bordered={false}>
              <Space>
                <Button type="primary" loading={loading} onClick={handleSave}>
                  Lưu
                </Button>
                <Button onClick={() => window.location.reload()}>Hủy</Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>

      {/* Modal Category */}
      <Modal
        title={selectedCategoryKey ? "Sửa danh mục" : "Thêm danh mục"}
        open={categoryModalOpen}
        onOk={handleSubmitCategory}
        onCancel={() => setCategoryModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={categoryForm} layout="vertical">
          <Form.Item
            name="key"
            label="Key (không dấu, không khoảng trắng)"
            rules={[
              { required: true, message: "Vui lòng nhập key" },
              {
                pattern: /^[a-z0-9_-]+$/i,
                message: "Key chỉ được chứa chữ, số, _ và -",
              },
            ]}
          >
            <Input disabled={selectedCategoryKey === "*"} />
          </Form.Item>
          <Form.Item
            name="label"
            label="Tên hiển thị"
            rules={[
              { required: true, message: "Vui lòng nhập tên hiển thị" },
              {
                max: LABEL_MAX,
                message: `Tên không được vượt quá ${LABEL_MAX} ký tự.`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Item */}
      <Modal
        title={selectedItemId ? "Sửa dự án" : "Thêm dự án"}
        open={itemModalOpen}
        onOk={handleSubmitItem}
        onCancel={() => setItemModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề" },
              {
                max: TITLE_MAX,
                message: `Tiêu đề không được vượt quá ${TITLE_MAX} ký tự.`,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Mô tả"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả" },
              {
                max: DESC_MAX,
                message: `Mô tả không được vượt quá ${DESC_MAX} ký tự.`,
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select>
              {settings.categories
                ?.filter((c) => c.key !== "*")
                .map((cat) => (
                  <Option key={cat.key} value={cat.key}>
                    {cat.label}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="img"
            label="Ảnh (URL hoặc base64)"
            rules={[{ required: true, message: "Vui lòng nhập URL ảnh" }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="/assets/img/portfolio/image.jpg hoặc data:image/..."
            />
          </Form.Item>
          <Form.Item label="Upload ảnh">
            <Upload
              {...uploadProps}
              beforeUpload={(file) => uploadProps.beforeUpload(file, selectedItemId || undefined)}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
              Sau khi upload, bạn có thể crop ảnh. Ảnh sẽ được lưu dưới dạng
              base64.
            </Text>
          </Form.Item>
          <Form.Item
            name="link"
            label="Liên kết (tùy chọn)"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  if (isUrlOrHash(value)) return Promise.resolve();
                  if ((value || "").length > LINK_MAX) {
                    return Promise.reject(
                      new Error(
                        `Liên kết không được vượt quá ${LINK_MAX} ký tự.`
                      )
                    );
                  }
                  return Promise.reject(
                    new Error(
                      'Liên kết phải là URL hợp lệ hoặc anchor bắt đầu bằng "#".'
                    )
                  );
                },
              },
            ]}
          >
            <Input placeholder="# hoặc https://..." />
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

      {/* Modal Crop */}
      <Modal
        title="Chỉnh sửa ảnh"
        open={cropModalOpen}
        onOk={handleSaveCrop}
        onCancel={() => {
          setCropModalOpen(false);
          setCropForItemId(null);
        }}
        okText="Áp dụng"
        cancelText="Hủy"
        width={900}
        centered
      >
        <div style={{ padding: "12px 0" }}>
          <div
            style={{
              position: "relative",
              height: 450,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
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
              <div
                style={{
                  color: "#fff",
                  padding: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  fontSize: 16,
                }}
              >
                Không có hình ảnh để chỉnh sửa
              </div>
            )}
          </div>

          <Card
            size="small"
            style={{
              marginTop: 16,
              borderRadius: 8,
              background: "#fafafa",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text strong style={{ fontSize: 13, color: "#595959" }}>
                  🔍 Phóng to / Thu nhỏ
                </Text>
                <Space direction="vertical" style={{ width: "100%", marginTop: 8 }}>
                  <Slider
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(v: number) => setZoom(Number(v))}
                    tooltip={{
                      formatter: (value?: number) => `${Math.round((value ?? 1) * 100)}%`,
                    }}
                  />
                </Space>
              </Col>

              <Col span={24}>
                <Text
                  strong
                  style={{
                    fontSize: 13,
                    color: "#595959",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  📐 Kích thước đầu ra
                </Text>
                <Row gutter={12}>
                  <Col span={12}>
                    <InputNumber
                      min={200}
                      max={2000}
                      value={cropOutputWidth}
                      onChange={(v) => setCropOutputWidth(Number(v || 800))}
                      style={{ width: "100%" }}
                      addonBefore="W"
                    />
                  </Col>
                  <Col span={12}>
                    <InputNumber
                      min={200}
                      max={2000}
                      value={cropOutputHeight}
                      onChange={(v) => setCropOutputHeight(Number(v || 600))}
                      style={{ width: "100%" }}
                      addonBefore="H"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default PortfolioSettingPage;
