import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Navbar setMobileOpen={setMobileOpen} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
