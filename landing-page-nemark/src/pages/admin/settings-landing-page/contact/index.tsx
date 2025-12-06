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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

import type {
  ContactSettings,
  ContactInfo,
  ContactFormField,
} from "../../../../types/contact";
import {
  getContactSettings,
  saveContactSettings,
} from "../../../../services/contactApi";
import { notifyCustom } from "../../../../components/notificationsCustom";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

/* ------------------------------------------------
 *  HẰNG SỐ & HÀM TIỆN ÍCH
 * ------------------------------------------------ */

// Validation limits
const TITLE_MAX = 100;
const DESC_MAX = 500;
const LABEL_MAX = 100;
const VALUE_MAX = 200;
const LINK_MAX = 200;
const PLACEHOLDER_MAX = 100;

const genId = () => `${Date.now()}_${Math.round(Math.random() * 1000)}`;

const getIconForType = (type: string) => {
  switch (type) {
    case 'address':
      return <EnvironmentOutlined />;
    case 'phone':
      return <PhoneOutlined />;
    case 'email':
      return <MailOutlined />;
    default:
      return <EnvironmentOutlined />;
  }
};

/* ------------------------------------------------
 *  COMPONENT CHÍNH
 * ------------------------------------------------ */

const ContactSettingPage: React.FC = () => {
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedInfoId, setSelectedInfoId] = useState<number | string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<number | string | null>(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const [infoForm] = Form.useForm();
  const [fieldForm] = Form.useForm();

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const s = await getContactSettings();
        if (s) {
          setSettings({
            ...s,
            contactInfo: s.contactInfo || [],
            formFields: s.formFields || [],
            visible: s.visible !== false,
            showContactInfo: s.showContactInfo !== false,
            showForm: s.showForm !== false,
            contactInfoColumns: s.contactInfoColumns || 1,
            enableAnimation: s.enableAnimation !== false,
          });
        }
      } catch (err) {
        console.error("Error loading contact settings:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ----------------- HANDLERS CONTACT INFO ----------------- */

  const handleAddInfo = () => {
    setSelectedInfoId(null);
    infoForm.resetFields();
    infoForm.setFieldsValue({
      type: 'address',
      label: "",
      value: "",
      link: "",
      enabled: true,
    });
    setInfoModalOpen(true);
  };

  const handleEditInfo = (id: number | string) => {
    const info = settings?.contactInfo?.find((i) => i.id === id);
    if (!info) return;
    setSelectedInfoId(id);
    infoForm.setFieldsValue({
      type: info.type,
      label: info.label,
      value: info.value,
      link: info.link || "",
      enabled: info.enabled !== false,
    });
    setInfoModalOpen(true);
  };

  const handleDeleteInfo = (id: number | string) => {
    if (!settings) return;
    const contactInfo = (settings.contactInfo || []).filter((i) => i.id !== id);
    setSettings({ ...settings, contactInfo });
    message.success("Đã xóa thông tin liên hệ");
  };

  const handleSubmitInfo = async () => {
    if (!settings) return;
    try {
      const values = await infoForm.validateFields();
      const contactInfo = [...(settings.contactInfo || [])];

      if (selectedInfoId) {
        // Edit
        const index = contactInfo.findIndex((i) => i.id === selectedInfoId);
        if (index >= 0) {
          contactInfo[index] = {
            ...contactInfo[index],
            ...values,
            id: selectedInfoId,
          };
        }
      } else {
        // Add
        const newInfo: ContactInfo = {
          id: genId(),
          ...values,
        };
        contactInfo.push(newInfo);
      }

      setSettings({ ...settings, contactInfo });
      setInfoModalOpen(false);
      infoForm.resetFields();
      message.success(selectedInfoId ? "Đã cập nhật thông tin liên hệ" : "Đã thêm thông tin liên hệ mới");
    } catch (err) {
      // Validation errors
    }
  };

  /* ----------------- HANDLERS FORM FIELDS ----------------- */

  const handleAddField = () => {
    setSelectedFieldId(null);
    fieldForm.resetFields();
    fieldForm.setFieldsValue({
      name: "",
      label: "",
      type: 'text',
      placeholder: "",
      required: true,
      enabled: true,
      validation: {
        minLength: undefined,
        maxLength: undefined,
      },
    });
    setFieldModalOpen(true);
  };

  const handleEditField = (id: number | string) => {
    const field = settings?.formFields?.find((f) => f.id === id);
    if (!field) return;
    setSelectedFieldId(id);
    fieldForm.setFieldsValue({
      name: field.name,
      label: field.label,
      type: field.type,
      placeholder: field.placeholder || "",
      required: field.required !== false,
      enabled: field.enabled !== false,
      validation: field.validation || {},
    });
    setFieldModalOpen(true);
  };

  const handleDeleteField = (id: number | string) => {
    if (!settings) return;
    const formFields = (settings.formFields || []).filter((f) => f.id !== id);
    setSettings({ ...settings, formFields });
    message.success("Đã xóa trường form");
  };

  const handleSubmitField = async () => {
    if (!settings) return;
    try {
      const values = await fieldForm.validateFields();
      const formFields = [...(settings.formFields || [])];

      if (selectedFieldId) {
        // Edit
        const index = formFields.findIndex((f) => f.id === selectedFieldId);
        if (index >= 0) {
          formFields[index] = {
            ...formFields[index],
            ...values,
            id: selectedFieldId,
          };
        }
      } else {
        // Add
        const newField: ContactFormField = {
          id: genId(),
          ...values,
        };
        formFields.push(newField);
      }

      setSettings({ ...settings, formFields });
      setFieldModalOpen(false);
      fieldForm.resetFields();
      message.success(selectedFieldId ? "Đã cập nhật trường form" : "Đã thêm trường form mới");
    } catch (err) {
      // Validation errors
    }
  };

  /* ----------------- SAVE SETTINGS ----------------- */

  const handleSave = async () => {
    if (!settings) return;

    setLoading(true);
    try {
      const saved = await saveContactSettings(settings);
      if (saved) {
        setSettings(saved);
        try {
          localStorage.setItem("contact_settings_updated", String(Date.now()));
          window.dispatchEvent(new Event("contact_settings_updated"));

          const channel = new BroadcastChannel('app_settings_channel');
          channel.postMessage('contact-updated');
          channel.close();
        } catch {
          // ignore
        }

        notifyCustom("success", {
          title: "Lưu thành công",
          description: "Cài đặt contact đã được cập nhật.",
        });
      } else {
        notifyCustom("error", {
          title: "Lưu thất bại",
          description: "Không thể lưu cài đặt contact.",
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

  const infoColumns: ColumnsType<ContactInfo> = [
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => (
        <Tag color={type === 'address' ? 'blue' : type === 'phone' ? 'green' : type === 'email' ? 'orange' : 'default'}>
          {type === 'address' ? 'Địa chỉ' : type === 'phone' ? 'Điện thoại' : type === 'email' ? 'Email' : 'Tùy chỉnh'}
        </Tag>
      ),
    },
    {
      title: "Nhãn",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Trạng thái",
      dataIndex: "enabled",
      key: "enabled",
      width: 100,
      render: (enabled: boolean) => (
        <Tag color={enabled ? "green" : "red"}>
          {enabled ? "Hiển thị" : "Ẩn"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditInfo(record.id)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa thông tin này?"
            onConfirm={() => handleDeleteInfo(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fieldColumns: ColumnsType<ContactFormField> = [
    {
      title: "Tên trường",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nhãn",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: string) => (
        <Tag>{type}</Tag>
      ),
    },
    {
      title: "Bắt buộc",
      dataIndex: "required",
      key: "required",
      width: 100,
      render: (required: boolean) => (
        <Tag color={required ? "red" : "default"}>
          {required ? "Có" : "Không"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "enabled",
      key: "enabled",
      width: 100,
      render: (enabled: boolean) => (
        <Tag color={enabled ? "green" : "red"}>
          {enabled ? "Hiển thị" : "Ẩn"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditField(record.id)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa trường này?"
            onConfirm={() => handleDeleteField(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!settings) return <div>Đang tải cài đặt...</div>;

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={16} align="stretch">
        {/* Cột trái: Danh sách + Cài đặt chung */}
        <Col span={16}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card title="Cài đặt chung">
              <Form layout="vertical">
                <Form.Item label="Tiêu đề">
                  <Input
                    value={settings.title}
                    maxLength={TITLE_MAX}
                    showCount
                    onChange={(e) =>
                      setSettings({ ...settings, title: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Mô tả">
                  <TextArea
                    value={settings.description}
                    maxLength={DESC_MAX}
                    showCount
                    rows={4}
                    onChange={(e) =>
                      setSettings({ ...settings, description: e.target.value })
                    }
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Số cột thông tin liên hệ">
                      <Select
                        value={settings.contactInfoColumns || 1}
                        onChange={(v) => setSettings({ ...settings, contactInfoColumns: v })}
                        style={{ width: "100%" }}
                      >
                        <Option value={1}>1 cột</Option>
                        <Option value={2}>2 cột</Option>
                        <Option value={3}>3 cột</Option>
                      </Select>
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
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Hiển thị thông tin liên hệ">
                      <Switch
                        checked={settings.showContactInfo !== false}
                        onChange={(showContactInfo) =>
                          setSettings({ ...settings, showContactInfo })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Hiển thị form liên hệ">
                      <Switch
                        checked={settings.showForm !== false}
                        onChange={(showForm) =>
                          setSettings({ ...settings, showForm })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Bật animation">
                  <Switch
                    checked={settings.enableAnimation !== false}
                    onChange={(enableAnimation) =>
                      setSettings({ ...settings, enableAnimation })
                    }
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Form Action URL">
                      <Input
                        value={settings.formAction || '#'}
                        onChange={(e) =>
                          setSettings({ ...settings, formAction: e.target.value })
                        }
                        placeholder="#"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Form Method">
                      <Select
                        value={settings.formMethod || 'post'}
                        onChange={(v) => setSettings({ ...settings, formMethod: v })}
                        style={{ width: "100%" }}
                      >
                        <Option value="post">POST</Option>
                        <Option value="get">GET</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Text nút gửi">
                  <Input
                    value={settings.submitButtonText || 'Gửi Tin Nhắn'}
                    maxLength={50}
                    onChange={(e) =>
                      setSettings({ ...settings, submitButtonText: e.target.value })
                    }
                    placeholder="Gửi Tin Nhắn"
                  />
                </Form.Item>
              </Form>
            </Card>

            <Card
              title="Thông tin liên hệ"
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddInfo}
                >
                  Thêm thông tin
                </Button>
              }
            >
              <Table
                columns={infoColumns}
                dataSource={settings.contactInfo || []}
                rowKey="id"
                pagination={false}
              />
            </Card>

            <Card
              title="Trường form liên hệ"
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddField}
                >
                  Thêm trường
                </Button>
              }
            >
              <Table
                columns={fieldColumns}
                dataSource={settings.formFields || []}
                rowKey="id"
                pagination={false}
              />
            </Card>
          </Space>
        </Col>

        {/* Cột phải: Preview + Lưu */}
        <Col span={8}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card title="Xem trước">
              <div style={{ padding: 12, background: "#fafafa", borderRadius: 6 }}>
                <Text strong style={{ display: "block", marginBottom: 8 }}>
                  {settings.title || "Liên Hệ"}
                </Text>
                <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 12 }}>
                  {settings.description || "Mô tả..."}
                </Text>
                {settings.showContactInfo !== false && (
                  <div style={{ marginBottom: 12 }}>
                    {(settings.contactInfo || []).slice(0, 2).map((info) => (
                      <div
                        key={info.id}
                        style={{
                          padding: 8,
                          background: "#fff",
                          borderRadius: 4,
                          border: "1px solid #e8e8e8",
                          marginBottom: 8,
                        }}
                      >
                        <Text strong style={{ fontSize: 12, display: "block" }}>
                          {info.label}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 10 }}>
                          {info.value}
                        </Text>
                      </div>
                    ))}
                  </div>
                )}
                {settings.showForm !== false && (
                  <div style={{ padding: 8, background: "#fff", borderRadius: 4, border: "1px solid #e8e8e8" }}>
                    <Text type="secondary" style={{ fontSize: 10 }}>
                      Form liên hệ
                    </Text>
                  </div>
                )}
              </div>
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

      {/* Modal chỉnh sửa thông tin liên hệ */}
      <Modal
        title={selectedInfoId ? "Chỉnh sửa thông tin liên hệ" : "Thêm thông tin liên hệ mới"}
        open={infoModalOpen}
        onOk={handleSubmitInfo}
        onCancel={() => {
          setInfoModalOpen(false);
          infoForm.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
      >
        <Form form={infoForm} layout="vertical">
          <Form.Item
            name="type"
            label="Loại"
            rules={[{ required: true, message: "Vui lòng chọn loại" }]}
          >
            <Select>
              <Option value="address">Địa chỉ</Option>
              <Option value="phone">Điện thoại</Option>
              <Option value="email">Email</Option>
              <Option value="custom">Tùy chỉnh</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="label"
            label="Nhãn"
            rules={[
              { required: true, message: "Vui lòng nhập nhãn" },
              { max: LABEL_MAX, message: `Nhãn không được vượt quá ${LABEL_MAX} ký tự` },
            ]}
          >
            <Input placeholder="Địa Chỉ" />
          </Form.Item>
          <Form.Item
            name="value"
            label="Giá trị"
            rules={[
              { required: true, message: "Vui lòng nhập giá trị" },
              { max: VALUE_MAX, message: `Giá trị không được vượt quá ${VALUE_MAX} ký tự` },
            ]}
          >
            <Input placeholder="Hà Nội, Việt Nam" />
          </Form.Item>
          <Form.Item
            name="link"
            label="Liên kết (tùy chọn)"
            tooltip="Ví dụ: tel:0123456789, mailto:contact@nemark.vn, hoặc URL"
          >
            <Input placeholder="tel:0123456789" maxLength={LINK_MAX} />
          </Form.Item>
          <Form.Item name="enabled" label="Hiển thị" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chỉnh sửa trường form */}
      <Modal
        title={selectedFieldId ? "Chỉnh sửa trường form" : "Thêm trường form mới"}
        open={fieldModalOpen}
        onOk={handleSubmitField}
        onCancel={() => {
          setFieldModalOpen(false);
          fieldForm.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={700}
      >
        <Form form={fieldForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên trường"
                rules={[
                  { required: true, message: "Vui lòng nhập tên trường" },
                  { pattern: /^[a-z0-9_]+$/, message: "Chỉ được dùng chữ thường, số và dấu gạch dưới" },
                ]}
                tooltip="Tên trường dùng trong form (ví dụ: name, email, subject)"
              >
                <Input placeholder="name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại"
                rules={[{ required: true, message: "Vui lòng chọn loại" }]}
              >
                <Select>
                  <Option value="text">Text</Option>
                  <Option value="email">Email</Option>
                  <Option value="tel">Điện thoại</Option>
                  <Option value="textarea">Textarea</Option>
                  <Option value="select">Select</Option>
                  <Option value="number">Number</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="label"
            label="Nhãn hiển thị"
            rules={[
              { required: true, message: "Vui lòng nhập nhãn" },
              { max: LABEL_MAX, message: `Nhãn không được vượt quá ${LABEL_MAX} ký tự` },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            name="placeholder"
            label="Placeholder"
          >
            <Input placeholder="Nhập họ và tên..." maxLength={PLACEHOLDER_MAX} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="required" label="Bắt buộc" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="enabled" label="Hiển thị" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Validation" style={{ marginBottom: 0 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name={["validation", "minLength"]} label="Độ dài tối thiểu">
                  <InputNumber min={0} placeholder="0" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["validation", "maxLength"]} label="Độ dài tối đa">
                  <InputNumber min={0} placeholder="200" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactSettingPage;

