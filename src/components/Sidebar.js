import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { getUserRole, isTokenValid } from "../api/auth";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const userRole = getUserRole();
  const isAuthenticated = isTokenValid();

  if (!isAuthenticated) return null;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profilim" />
        </ListItem>
        {userRole === "premium" && (
          <ListItem button component={Link} to="/premium">
            <ListItemText primary="Premium İçerik" />
          </ListItem>
        )}
        {userRole === "admin" && (
          <>
            <ListItem button component={Link} to="/admin/users">
              <ListItemText primary="Kullanıcı Yönetimi" />
            </ListItem>
            <ListItem button component={Link} to="/admin/settings">
              <ListItemText primary="Site Ayarları" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
