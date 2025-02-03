import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { getUserRole, getUserInfo } from "../api/auth";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const userRole = getUserRole();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4">
          Hoş geldin, {user?.firstName} {user?.lastName}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Rol: {userRole}
        </Typography>
        {userRole === "admin" && <Button variant="contained" href="/admin/users">Kullanıcı Yönetimi</Button>}
        {userRole === "premium" && <Button variant="contained" href="/premium">Premium İçerik</Button>}
      </motion.div>
    </Container>
  );
};

export default Dashboard;
