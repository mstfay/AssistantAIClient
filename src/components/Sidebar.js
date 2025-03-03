import React, { useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemButton, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole, isTokenValid, logout } from "../api/auth";
import Roles from "../constants/roles";

const drawerWidth = 240;

const Sidebar = ({ isSidebarOpen, toggleSidebar, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const isAuthenticated = isTokenValid();
  const userRole = getUserRole();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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
    setIsSidebarOpen(false); // Sidebar'ı kapat
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <>
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
          <ListItem component={Link} to="/dashboard" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/profile" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
            <ListItemText primary="Profilim" />
          </ListItem>
          {userRole === Roles.PREMIUM && (
            <ListItem component={Link} to="/premium" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
              <ListItemText primary="Premium İçerik" />
            </ListItem>
          )}
          {userRole === Roles.ADMIN && (
            <>
              <ListItem component={Link} to="/admin/users" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Kullanıcı Yönetimi" />
              </ListItem>
              <ListItem component={Link} to="/admin/settings" onClick={toggleSidebar} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Site Ayarları" />
              </ListItem>
            </>
          )}
          <ListItemButton onClick={handleLogout} sx={{ cursor: "pointer" }}>
            <ListItemText primary="Çıkış Yap" />
            </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;