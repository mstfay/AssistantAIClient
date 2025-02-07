import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { getUserRole, getUserInfo } from "../api/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userRole = getUserRole();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  const handleAISelection = (aiType) => {
    navigate(`/ai/${aiType}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4">
          Hoş geldin, {user?.firstName} {user?.lastName}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Rol: {userRole}
        </Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <Button variant="contained" fullWidth onClick={() => handleAISelection("chatbot")}>
              Chatbot
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" fullWidth onClick={() => handleAISelection("pdf-summarizer")}>
              PDF Özetleyici
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" fullWidth onClick={() => handleAISelection("image-editor")}>
              Görsel Düzenleyici
            </Button>
          </Grid>
        </Grid>
        {userRole === "admin" && <Button variant="contained" href="/admin/users">Kullanıcı Yönetimi</Button>}
        {userRole === "premium" && <Button variant="contained" href="/premium">Premium İçerik</Button>}
      </motion.div>
    </Container>
  );
};

export default Dashboard;