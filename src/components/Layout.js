import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { isTokenValid } from "../api/auth";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = isTokenValid();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Açıkken kapat, kapalıyken aç
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Navbar toggleSidebar={toggleSidebar} />
      {isAuthenticated && (
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setIsSidebarOpen={setIsSidebarOpen} />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
            <Outlet />
          </Box>
        </Box>
      )}
      {!isAuthenticated && (
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
          <Outlet />
        </Box>
      )}
    </Box>
  );
};

export default Layout;
