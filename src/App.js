import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { isTokenValid } from "./api/auth";

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

const RedirectToAppropriatePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = isTokenValid();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return null;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RedirectToAppropriatePage />} />
            <Route
              path="/home"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/premium"
              element={
                <PrivateRoute>
                  <Premium />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute>
                  <UserManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <PrivateRoute>
                  <SiteSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/ai/chatbot"
              element={
                <PrivateRoute>
                  <Chatbot />
                </PrivateRoute>
              }
            />
            <Route
              path="/ai/image-editor"
              element={
                <PrivateRoute>
                  <ImageEditor />
                </PrivateRoute>
              }
            />
            <Route
              path="/ai/pdf-summarizer"
              element={
                <PrivateRoute>
                  <PDFSummarizer />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
