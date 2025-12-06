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
  Divider,
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
  TeamSettings,
  TeamMember,
} from "../../../../types/team";
import {
  getTeamSettings,
  saveTeamSettings,
} from "../../../../services/teamApi";
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
const NAME_MAX = 100;
const POSITION_MAX = 100;
const BIO_MAX = 500;
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

const genId = () => `${Date.now()}_${Math.round(Math.random() * 1000)}`;

/* ------------------------------------------------
 *  COMPONENT CHÍNH
 * ------------------------------------------------ */

const TeamSettingPage: React.FC = () => {
  const [settings, setSettings] = useState<TeamSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | string | null>(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Crop modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropOutputWidth, setCropOutputWidth] = useState<number>(400);
  const [cropOutputHeight, setCropOutputHeight] = useState<number>(400);
  const [cropForMemberId, setCropForMemberId] = useState<number | string | null>(null);

  const cropAspect =
    cropOutputWidth > 0 && cropOutputHeight > 0
      ? cropOutputWidth / cropOutputHeight
      : 1; // Square for avatar

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const s = await getTeamSettings();
        if (s) {
          setSettings({
            ...s,
            members: s.members || [],
            visible: s.visible !== false,
            columns: s.columns || 2,
            enableAnimation: s.enableAnimation !== false,
          });
        }
      } catch (err) {
        console.error("Error loading team settings:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ----------------- HANDLERS MEMBERS ----------------- */

  const handleAddMember = () => {
    setSelectedMemberId(null);
    form.resetFields();
    form.setFieldsValue({
      name: "",
      position: "",
      bio: "",
      avatar: "",
      social: {
        twitter: "",
        facebook: "",
        instagram: "",
        linkedin: "",
      },
      enabled: true,
    });
    setMemberModalOpen(true);
  };

  const handleEditMember = (id: number | string) => {
    const member = settings?.members?.find((m) => m.id === id);
    if (!member) return;
    setSelectedMemberId(id);
    form.setFieldsValue({
      name: member.name,
      position: member.position,
      bio: member.bio,
      avatar: member.avatar,
      social: member.social || {
        twitter: "",
        facebook: "",
        instagram: "",
        linkedin: "",
      },
      enabled: member.enabled !== false,
    });
    setMemberModalOpen(true);
  };

  const handleDeleteMember = (id: number | string) => {
    if (!settings) return;
    const members = (settings.members || []).filter((m) => m.id !== id);
    setSettings({ ...settings, members });
    message.success("Đã xóa thành viên");
  };

  const handleSubmitMember = async () => {
    if (!settings) return;
    try {
      const values = await form.validateFields();
      const members = [...(settings.members || [])];

      if (selectedMemberId) {
        // Edit
        const index = members.findIndex((m) => m.id === selectedMemberId);
        if (index >= 0) {
          members[index] = {
            ...members[index],
            ...values,
            id: selectedMemberId,
          };
        }
      } else {
        // Add
        const newMember: TeamMember = {
          id: genId(),
          ...values,
        };
        members.push(newMember);
      }

      setSettings({ ...settings, members });
      setMemberModalOpen(false);
      form.resetFields();
      message.success(selectedMemberId ? "Đã cập nhật thành viên" : "Đã thêm thành viên mới");
    } catch (err) {
      // Validation errors
    }
  };

  /* ----------------- UPLOAD AVATAR ----------------- */

  const uploadProps = {
    beforeUpload: (file: File) => {
      if (file.size && file.size > UPLOAD_SIZE_LIMIT) {
        message.error("Kích thước file quá lớn. Vui lòng chọn ảnh nhỏ hơn 5MB.");
        return Upload.LIST_IGNORE as unknown as boolean;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = String(e.target?.result || "");
        form.setFieldsValue({ avatar: url });
        setImageToCrop(url);
        setCropOutputWidth(400);
        setCropOutputHeight(400);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setCropForMemberId(selectedMemberId);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
      return false;
    },
    showUploadList: false,
    accept: "image/*",
  };

  /* ----------------- CROP AVATAR ----------------- */

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
      const targetWidth = Math.min(800, Math.max(200, Math.round(cropOutputWidth || 400)));
      const targetHeight = Math.min(800, Math.max(200, Math.round(cropOutputHeight || 400)));

      const dataUrl = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels,
        targetWidth,
        targetHeight
      );

      form.setFieldsValue({ avatar: dataUrl });
      setCropModalOpen(false);
      message.success("Đã cập nhật avatar");
    } catch (err) {
      message.error("Lỗi cắt ảnh: " + String(err));
    }
  };

  /* ----------------- SAVE SETTINGS ----------------- */

  const handleSave = async () => {
    if (!settings) return;

    setLoading(true);
    try {
      const saved = await saveTeamSettings(settings);
      if (saved) {
        setSettings(saved);
        try {
          localStorage.setItem("team_settings_updated", String(Date.now()));
          window.dispatchEvent(new Event("team_settings_updated"));

          const channel = new BroadcastChannel('app_settings_channel');
          channel.postMessage('team-updated');
          channel.close();
        } catch {
          // ignore
        }

        notifyCustom("success", {
          title: "Lưu thành công",
          description: "Cài đặt team đã được cập nhật.",
        });
      } else {
        notifyCustom("error", {
          title: "Lưu thất bại",
          description: "Không thể lưu cài đặt team.",
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

  const columns: ColumnsType<TeamMember> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: 80,
      render: (url: string) => (
        url ? (
          <Image src={url} alt="" width={50} height={50} className="rounded-full object-cover" />
        ) : (
          <div className="w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
            No img
          </div>
        )
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      key: "position",
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
            onClick={() => handleEditMember(record.id)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa thành viên này?"
            onConfirm={() => handleDeleteMember(record.id)}
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
            <Card
              title="Danh sách thành viên"
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddMember}
                >
                  Thêm thành viên
                </Button>
              }
            >
              <Table
                columns={columns}
                dataSource={settings.members || []}
                rowKey="id"
                pagination={false}
              />
            </Card>

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
                    <Form.Item label="Số cột">
                      <Select
                        value={settings.columns || 2}
                        onChange={(v) => setSettings({ ...settings, columns: v })}
                        style={{ width: "100%" }}
                      >
                        <Option value={1}>1 cột</Option>
                        <Option value={2}>2 cột</Option>
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
                <Form.Item label="Bật animation">
                  <Switch
                    checked={settings.enableAnimation !== false}
                    onChange={(enableAnimation) =>
                      setSettings({ ...settings, enableAnimation })
                    }
                  />
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </Col>

        {/* Cột phải: Preview + Lưu */}
        <Col span={8}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card title="Xem trước">
              <div style={{ padding: 12, background: "#fafafa", borderRadius: 6 }}>
                <Text strong style={{ display: "block", marginBottom: 8 }}>
                  {settings.title || "Đội Ngũ Nemark"}
                </Text>
                <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 12 }}>
                  {settings.description || "Mô tả..."}
                </Text>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${settings.columns || 2}, 1fr)`, gap: 8 }}>
                  {(settings.members || []).slice(0, 2).map((member) => (
                    <div
                      key={member.id}
                      style={{
                        padding: 8,
                        background: "#fff",
                        borderRadius: 4,
                        border: "1px solid #e8e8e8",
                      }}
                    >
                      {member.avatar ? (
                        <Image
                          src={member.avatar}
                          alt=""
                          width={60}
                          height={60}
                          className="rounded-full object-cover mb-2"
                        />
                      ) : (
                        <div className="w-[60px] h-[60px] rounded-full bg-gray-200 mb-2" />
                      )}
                      <Text strong style={{ fontSize: 12, display: "block" }}>
                        {member.name}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 10 }}>
                        {member.position}
                      </Text>
                    </div>
                  ))}
                </div>
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

      {/* Modal chỉnh sửa thành viên */}
      <Modal
        title={selectedMemberId ? "Chỉnh sửa thành viên" : "Thêm thành viên mới"}
        open={memberModalOpen}
        onOk={handleSubmitMember}
        onCancel={() => {
          setMemberModalOpen(false);
          form.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              { required: true, message: "Vui lòng nhập tên" },
              { max: NAME_MAX, message: `Tên không được vượt quá ${NAME_MAX} ký tự` },
            ]}
          >
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>
          <Form.Item
            name="position"
            label="Vị trí"
            rules={[
              { required: true, message: "Vui lòng nhập vị trí" },
              { max: POSITION_MAX, message: `Vị trí không được vượt quá ${POSITION_MAX} ký tự` },
            ]}
          >
            <Input placeholder="Giám Đốc Điều Hành" />
          </Form.Item>
          <Form.Item
            name="bio"
            label="Tiểu sử"
            rules={[
              { required: true, message: "Vui lòng nhập tiểu sử" },
              { max: BIO_MAX, message: `Tiểu sử không được vượt quá ${BIO_MAX} ký tự` },
            ]}
          >
            <TextArea rows={4} placeholder="Mô tả về thành viên..." />
          </Form.Item>
          <Form.Item name="avatar" label="Avatar">
            <div>
              {form.getFieldValue("avatar") && (
                <div style={{ marginBottom: 12 }}>
                  <Image
                    src={form.getFieldValue("avatar")}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>
                  {form.getFieldValue("avatar") ? "Đổi avatar" : "Tải avatar"}
                </Button>
              </Upload>
            </div>
          </Form.Item>
          <Divider>Liên kết mạng xã hội</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["social", "twitter"]} label="Twitter">
                <Input placeholder="https://twitter.com/..." maxLength={LINK_MAX} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["social", "facebook"]} label="Facebook">
                <Input placeholder="https://facebook.com/..." maxLength={LINK_MAX} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["social", "instagram"]} label="Instagram">
                <Input placeholder="https://instagram.com/..." maxLength={LINK_MAX} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["social", "linkedin"]} label="LinkedIn">
                <Input placeholder="https://linkedin.com/..." maxLength={LINK_MAX} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="enabled" label="Hiển thị" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal crop avatar */}
      <Modal
        title="Chỉnh sửa Avatar"
        open={cropModalOpen}
        onOk={handleSaveCrop}
        onCancel={() => setCropModalOpen(false)}
        okText="Áp dụng"
        cancelText="Hủy"
        width={700}
        centered
      >
        <div style={{ padding: "12px 0" }}>
          <div
            style={{
              position: "relative",
              height: 400,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 8,
              overflow: "hidden",
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
                }}
              >
                Không có hình ảnh
              </div>
            )}
          </div>
          <div style={{ marginTop: 16 }}>
            <Text strong style={{ display: "block", marginBottom: 8 }}>
              Kích thước đầu ra (vuông cho avatar)
            </Text>
            <Row gutter={12}>
              <Col span={12}>
                <InputNumber
                  min={200}
                  max={800}
                  value={cropOutputWidth}
                  onChange={(v) => {
                    setCropOutputWidth(Number(v || 400));
                    setCropOutputHeight(Number(v || 400)); // Keep square
                  }}
                  style={{ width: "100%" }}
                  addonBefore="Kích thước"
                />
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamSettingPage;

