import React, { useState, useEffect } from "react";
import { Form, Input, Button, Avatar, Upload, message, Card, Row, Col } from "antd";
import { UploadOutlined, EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { getUserInfo } from "../api/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        if (!res) {
          navigate("/login");
        } else {
          console.log("datassssss: ", res.data)
          setUser(res.data);
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        message.error("Veriler alınırken hata oluştu");
      }
      setLoading(false);
    };
    fetchUserInfo();
  }, [navigate, form]);

  const handleUpdate = async (values) => {
    try {
      const token = localStorage.getItem("token");
      console.log("values: ", values)
      await axiosInstance.put("/user/update-profile", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Profil güncellendi!");
      setEditMode(false);
    } catch (error) {
      message.error("Profil güncellenirken hata oluştu.");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Yükleniyor...</p>;

  return (
    <Row justify="center" align="middle" style={{ minHeight: "80vh", padding: "20px" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card
          style={{ textAlign: "center", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          cover={
            <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
              <Avatar size={100} src={user?.profilePicture || "/default-avatar.png"} alt="Profil" />
              <h2 style={{ marginTop: "10px" }}>{user?.firstName} {user?.lastName}</h2>
              <p style={{ color: "#888" }}>{user?.email}</p>
              <Button
                type={editMode ? "default" : "primary"}
                icon={editMode ? <CloseOutlined /> : <EditOutlined />}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "İptal" : "Düzenle"}
              </Button>
            </div>
          }
        >
          {editMode ? (
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
              <Form.Item label="Ad" name="firstName" rules={[{ required: true, message: "Adınızı girin" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Soyad" name="lastName" rules={[{ required: true, message: "Soyadınızı girin" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Telefon Numarası" name="phoneNumber">
                <Input />
              </Form.Item>
              <Form.Item label="Profil Resmi" name="profilePicture">
                <Upload beforeUpload={() => false} listType="picture">
                  <Button icon={<UploadOutlined />}>Yükle</Button>
                </Upload>
              </Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block>
                Güncelle
              </Button>
            </Form>
          ) : (
            <div style={{ textAlign: "left" }}>
              <p><strong>Ad:</strong> {user?.firstName}</p>
              <p><strong>Soyad:</strong> {user?.lastName}</p>
              <p><strong>Telefon:</strong> {user?.phoneNumber || "Belirtilmemiş"}</p>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
