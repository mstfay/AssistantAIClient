import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isTokenValid, logout, getUserInfo } from "../api/auth";

const Navbar = ({ setMobileOpen }) => {
  const navigate = useNavigate();
  const isAuthenticated = isTokenValid();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = getUserInfo(); // Kullanıcı bilgilerini al

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ width: "100%", zIndex: 1300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">AssistantAI</Typography>
        <Box>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar src={user?.profilePicture || "/default-avatar.png"} alt="Profil" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem component={Link} to="/profile">Profilim</MenuItem>
                <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Giriş Yap</Button>
              <Button color="inherit" component={Link} to="/register">Kayıt Ol</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
