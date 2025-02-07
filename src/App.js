import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Premium from "./pages/Premium";
import UserManagement from "./pages/Admin/UserManagement";
import SiteSettings from "./pages/Admin/SiteSettings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PDFSummarizer from "./pages/AI/PDFSummarizer";
import ImageEditor from "./pages/AI/ImageEditor";
import Chatbot from "./pages/AI/Chatbot";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="premium" element={<Premium />} />
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="admin/settings" element={<SiteSettings />} />
            <Route path="ai/chatbot" element={<Chatbot />} />
            <Route path="ai/image-editor" element={<ImageEditor />} />
            <Route path="ai/pdf-summarizer" element={<PDFSummarizer />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
