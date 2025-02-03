import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Alert, Avatar, Box, Paper, IconButton } from "@mui/material";
import { getUserInfo } from "../api/auth";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      if (!data) {
        navigate("/login");
      } else {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("https://localhost:7033/api/user/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      setSuccessMessage("Profil güncellendi!");
      setEditMode(false);
    } catch (error) {
      setError("Profil güncellenirken hata oluştu.");
    }
  };

  if (loading) return <Typography>Yükleniyor...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Avatar src={user.profilePicture || "/default-avatar.png"} alt="Profil" sx={{ width: 100, height: 100, mx: "auto" }} />
        <Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography variant="body1" color="textSecondary">{user.email}</Typography>
        
        <IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton>

        {editMode && (
          <Box>
            <TextField fullWidth label="Ad" name="firstName" value={user.firstName} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Soyad" name="lastName" value={user.lastName} onChange={handleChange} sx={{ mb: 2 }} />
            <Button variant="contained" fullWidth onClick={handleUpdate}>Güncelle</Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
