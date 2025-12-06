import React, { useEffect, useState } from "react";
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
  Select,
  InputNumber,
  Table,
  Tag,
  message,
  Divider,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import type {
  PricingSettings,
  PricingPackage,
  PricingFeature,
} from "../../../../types/pricing";
import {
  getPricingSettings,
  savePricingSettings,
} from "../../../../services/pricingApi";
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
const FEATURE_TEXT_MAX = 200;
const BUTTON_TEXT_MAX = 50;

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

/* ------------------------------------------------
 *  COMPONENT CHÍNH
 * ------------------------------------------------ */

const PricingSettingPage: React.FC = () => {
  const [settings, setSettings] = useState<PricingSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<number | string | null>(null);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [featuresList, setFeaturesList] = useState<PricingFeature[]>([]);

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const s = await getPricingSettings();
        if (s) {
          setSettings({
            ...s,
            packages: s.packages || [],
            visible: s.visible !== false,
            columns: s.columns || 3,
          });
        }
      } catch (err) {
        console.error("Error loading pricing settings:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ----------------- HANDLERS PACKAGES ----------------- */

  const handleAddPackage = () => {
    setSelectedPackageId(null);
    form.resetFields();
    setFeaturesList([]);
    form.setFieldsValue({
      title: "",
      description: "",
      price: 0,
      priceUnit: "/ tháng",
      currency: "₫",
      buttonText: "Đăng Ký",
      buttonLink: "#contact",
      buttonSubtext: "",
      features: [],
      popular: false,
      enabled: true,
      borderColor: "#2563eb",
      scale: 1.05,
    });
    setPackageModalOpen(true);
  };

  const handleEditPackage = (id: number | string) => {
    const pkg = settings?.packages?.find((p) => p.id === id);
    if (!pkg) return;
    setSelectedPackageId(id);
    const features = pkg.features || [];
    setFeaturesList([...features]);
    form.setFieldsValue({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      priceUnit: pkg.priceUnit || "/ tháng",
      currency: pkg.currency || "₫",
      buttonText: pkg.buttonText,
      buttonLink: pkg.buttonLink || "",
      buttonSubtext: pkg.buttonSubtext || "",
      features: features,
      popular: pkg.popular || false,
      enabled: pkg.enabled !== false,
      borderColor: pkg.borderColor || "#2563eb",
      scale: pkg.scale || 1.05,
    });
    setPackageModalOpen(true);
  };

  const handleDeletePackage = (id: number | string) => {
    if (!settings) return;
    const packages = (settings.packages || []).filter((p) => p.id !== id);
    setSettings({ ...settings, packages });
  };

  const handleSubmitPackage = async () => {
    if (!settings) return;
    try {
      const values = await form.validateFields();
      const packages = [...(settings.packages || [])];

      if (selectedPackageId) {
        // Edit existing
        const index = packages.findIndex((p) => p.id === selectedPackageId);
        if (index >= 0) {
          packages[index] = {
            ...packages[index],
            title: values.title.trim(),
            description: values.description.trim(),
            price: Number(values.price) || 0,
            priceUnit: values.priceUnit || "/ tháng",
            currency: values.currency || "₫",
            buttonText: values.buttonText.trim(),
            buttonLink: values.buttonLink?.trim() || undefined,
            buttonSubtext: values.buttonSubtext?.trim() || undefined,
            features: values.features || [],
            popular: values.popular || false,
            enabled: values.enabled !== false,
            borderColor: values.borderColor || "#2563eb",
            scale: Number(values.scale) || 1.05,
          };
        }
      } else {
        // Add new
        const newId =
          Math.max(...packages.map((p) => (typeof p.id === "number" ? p.id : 0)), 0) +
          1;
        packages.push({
          id: newId,
          title: values.title.trim(),
          description: values.description.trim(),
          price: Number(values.price) || 0,
          priceUnit: values.priceUnit || "/ tháng",
          currency: values.currency || "₫",
          buttonText: values.buttonText.trim(),
          buttonLink: values.buttonLink?.trim() || undefined,
          buttonSubtext: values.buttonSubtext?.trim() || undefined,
          features: values.features || [],
          popular: values.popular || false,
          enabled: values.enabled !== false,
          borderColor: values.borderColor || "#2563eb",
          scale: Number(values.scale) || 1.05,
        });
      }

      setSettings({ ...settings, packages });
      setPackageModalOpen(false);
      setFeaturesList([]);
      form.resetFields();
      message.success(selectedPackageId ? "Đã cập nhật gói" : "Đã thêm gói mới");
    } catch {
      // ignore validation errors
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

    if (!settings.packages || settings.packages.length === 0) {
      message.error("Phải có ít nhất một gói.");
      return;
    }

    setLoading(true);
    try {
      const saved = await savePricingSettings(settings);
      if (saved) {
        setSettings(saved);
        try {
          localStorage.setItem(
            "pricing_settings_updated",
            String(Date.now())
          );
          window.dispatchEvent(new Event("pricing_settings_updated"));

          const channel = new BroadcastChannel("app_settings_channel");
          channel.postMessage("pricing-updated");
          channel.close();
        } catch {
          // ignore
        }

        notifyCustom("success", {
          title: "Lưu thành công",
          description: "Cài đặt pricing đã được cập nhật.",
        });
      } else {
        notifyCustom("error", {
          title: "Lưu thất bại",
          description: "Không thể lưu cài đặt pricing.",
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

  const packageColumns: ColumnsType<PricingPackage> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Tên gói",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Giá",
      key: "price",
      width: 150,
      render: (_, record) => (
        <Text strong>
          {record.currency || "₫"}
          {formatPrice(record.price)}
          {record.priceUnit || ""}
        </Text>
      ),
    },
    {
      title: "Tính năng",
      key: "features",
      width: 100,
      render: (_, record) => (
        <Tag color="blue">{record.features?.length || 0}</Tag>
      ),
    },
    {
      title: "Phổ biến",
      dataIndex: "popular",
      key: "popular",
      width: 100,
      render: (popular) => (
        <Tag color={popular ? "gold" : "default"}>
          {popular ? "Có" : "Không"}
        </Tag>
      ),
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
            onClick={() => handleEditPackage(record.id)}
            size="small"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa gói này?"
            onConfirm={() => handleDeletePackage(record.id)}
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

  const enabledPackages = settings.packages?.filter(
    (p) => p.enabled !== false
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
                    placeholder="Bảng Giá Dịch Vụ"
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
                    placeholder="Mô tả về pricing..."
                    showCount
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Số cột">
                      <InputNumber
                        min={1}
                        max={4}
                        value={settings.columns}
                        onChange={(v) =>
                          setSettings({
                            ...settings,
                            columns: Number(v) || 3,
                          })
                        }
                        style={{ width: "100%" }}
                        addonAfter="cột"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
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
                </Row>
              </Form>
            </Card>

            {/* Packages */}
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>💰</span>
                  <span>Gói dịch vụ</span>
                  <Tag color="green" style={{ marginLeft: 8 }}>
                    {settings.packages?.length || 0}
                  </Tag>
                  <Tag color="default" style={{ marginLeft: 4 }}>
                    Hiển thị: {enabledPackages.length}
                  </Tag>
                </div>
              }
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddPackage}
                >
                  Thêm gói
                </Button>
              }
            >
              <Table
                columns={packageColumns}
                dataSource={settings.packages || []}
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
                <Title level={4}>{settings.title || "Bảng Giá Dịch Vụ"}</Title>
                <Text type="secondary">{settings.description || ""}</Text>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${settings.columns || 3}, 1fr)`,
                  gap: 12,
                }}
              >
                {enabledPackages.slice(0, 3).map((pkg) => (
                  <div
                    key={pkg.id}
                    style={{
                      background: "#fff",
                      padding: 16,
                      borderRadius: 8,
                      border: pkg.popular
                        ? `2px solid ${pkg.borderColor || "#2563eb"}`
                        : "1px solid #e8e8e8",
                      transform: pkg.popular
                        ? `scale(${pkg.scale || 1.05})`
                        : "scale(1)",
                      position: "relative",
                    }}
                  >
                    {pkg.popular && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background:
                            "linear-gradient(to right, #2563eb, #14b8a6)",
                          color: "#fff",
                          fontSize: 10,
                          fontWeight: "bold",
                          padding: "4px 8px",
                          borderRadius: "0 8px 0 8px",
                        }}
                      >
                        Phổ Biến
                      </div>
                    )}
                    <div style={{ marginTop: pkg.popular ? 20 : 0 }}>
                      <Text strong style={{ fontSize: 14 }}>
                        {pkg.title}
                      </Text>
                      <div style={{ marginTop: 8, fontSize: 20, fontWeight: "bold" }}>
                        {pkg.currency || "₫"}
                        {formatPrice(pkg.price)}
                        <span style={{ fontSize: 12, fontWeight: "normal", color: "#999" }}>
                          {pkg.priceUnit || ""}
                        </span>
                      </div>
                      <div style={{ marginTop: 8, fontSize: 11, color: "#666" }}>
                        {pkg.description?.substring(0, 50)}...
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Tag color="blue">{pkg.features?.length || 0} tính năng</Tag>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {enabledPackages.length === 0 && (
                <div
                  style={{ textAlign: "center", padding: 20, color: "#999" }}
                >
                  Chưa có gói nào
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

      {/* Modal Package */}
      <Modal
        title={selectedPackageId ? "Sửa gói" : "Thêm gói"}
        open={packageModalOpen}
        onOk={handleSubmitPackage}
        onCancel={() => {
          setPackageModalOpen(false);
          setFeaturesList([]);
          form.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={800}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Tên gói"
                rules={[
                  { required: true, message: "Vui lòng nhập tên gói" },
                  {
                    max: TITLE_MAX,
                    message: `Tên gói không được vượt quá ${TITLE_MAX} ký tự.`,
                  },
                ]}
              >
                <Input placeholder="Gói Cơ Bản" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="popular"
                label="Gói phổ biến"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả" },
              {
                max: DESC_MAX,
                message: `Mô tả không được vượt quá ${DESC_MAX} ký tự.`,
              },
            ]}
          >
            <TextArea rows={2} placeholder="Mô tả về gói..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Giá"
                rules={[
                  { required: true, message: "Vui lòng nhập giá" },
                  { type: "number", min: 0, message: "Giá phải >= 0" },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="0"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="currency" label="Đơn vị tiền tệ">
                <Select>
                  <Option value="₫">₫ (VND)</Option>
                  <Option value="$">$ (USD)</Option>
                  <Option value="€">€ (EUR)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="priceUnit" label="Đơn vị thời gian">
                <Input placeholder="/ tháng" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="buttonText"
                label="Text nút"
                rules={[
                  { required: true, message: "Vui lòng nhập text nút" },
                  {
                    max: BUTTON_TEXT_MAX,
                    message: `Text nút không được vượt quá ${BUTTON_TEXT_MAX} ký tự.`,
                  },
                ]}
              >
                <Input placeholder="Đăng Ký Ngay" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="buttonLink" label="Link nút">
                <Input placeholder="#contact" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="buttonSubtext" label="Text phụ dưới nút">
            <Input placeholder="Miễn phí tư vấn & demo" />
          </Form.Item>

          <Divider>Danh sách tính năng</Divider>

          <Form.Item
            name="features"
            label="Tính năng"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || !Array.isArray(value) || value.length === 0) {
                    return Promise.reject(
                      new Error("Phải có ít nhất một tính năng")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <div style={{ maxHeight: 300, overflowY: "auto" }}>
              {featuresList.map(
                (feature: PricingFeature, index: number) => (
                  <div
                    key={feature.id || index}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 8,
                      padding: 8,
                      background: "#fafafa",
                      borderRadius: 4,
                    }}
                  >
                    <Switch
                      checked={feature.included}
                      onChange={(checked) => {
                        const updated = [...featuresList];
                        updated[index] = { ...feature, included: checked };
                        setFeaturesList(updated);
                        form.setFieldsValue({ features: updated });
                      }}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                    <Input
                      value={feature.text}
                      maxLength={FEATURE_TEXT_MAX}
                      onChange={(e) => {
                        const updated = [...featuresList];
                        updated[index] = { ...feature, text: e.target.value };
                        setFeaturesList(updated);
                        form.setFieldsValue({ features: updated });
                      }}
                      placeholder="Tên tính năng..."
                      style={{ flex: 1 }}
                    />
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        const updated = featuresList.filter((_, i) => i !== index);
                        setFeaturesList(updated);
                        form.setFieldsValue({ features: updated });
                      }}
                    />
                  </div>
                )
              )}
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => {
                  const newId =
                    Math.max(
                      ...featuresList.map((f: PricingFeature) =>
                        typeof f.id === "number" ? f.id : 0
                      ),
                      0
                    ) + 1;
                  const updated = [
                    ...featuresList,
                    { id: newId, text: "Tính năng mới", included: true },
                  ];
                  setFeaturesList(updated);
                  form.setFieldsValue({ features: updated });
                }}
                style={{ width: "100%" }}
              >
                Thêm tính năng
              </Button>
            </div>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="borderColor" label="Màu border (nếu phổ biến)">
                <Input type="color" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="scale" label="Scale (nếu phổ biến)">
                <InputNumber
                  min={1}
                  max={1.2}
                  step={0.05}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="enabled"
            label="Hiển thị"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PricingSettingPage;

