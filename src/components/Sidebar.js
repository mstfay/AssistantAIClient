import React, { useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole, isTokenValid, logout } from "../api/auth";

const drawerWidth = 240;

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const isAuthenticated = isTokenValid();

  // Sidebar dışına tıklayınca kapanması için event listener
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (event) => {
      const sidebarElement = document.getElementById("sidebar");
      const avatarElement = document.getElementById("avatar-button"); // Avatar'ı da kontrol et
      if (
        sidebarElement &&
        !sidebarElement.contains(event.target) &&
        avatarElement &&
        !avatarElement.contains(event.target)
      ) {
        toggleSidebar(); // Sidebar dışına basınca kapat
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <Drawer
      id="sidebar"
      variant="temporary"
      anchor="right"
      open={isSidebarOpen}
      onClose={toggleSidebar}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/dashboard" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/profile" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
          <ListItemText primary="Profilim" />
        </ListItem>
        {userRole === "premium" && (
          <ListItem button component={Link} to="/premium" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
            <ListItemText primary="Premium İçerik" />
          </ListItem>
        )}
        {userRole === "Admin" && (
          <>
            <ListItem button component={Link} to="/admin/users" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
              <ListItemText primary="Kullanıcı Yönetimi" />
            </ListItem>
            <ListItem button component={Link} to="/admin/settings" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
              <ListItemText primary="Site Ayarları" />
            </ListItem>
          </>
        )}
        <ListItem button onClick={handleLogout} sx={{ cursor: "pointer" }}>
          <ListItemText primary="Çıkış Yap" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;