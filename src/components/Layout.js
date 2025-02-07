import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Açıkken kapat, kapalıyken aç
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
