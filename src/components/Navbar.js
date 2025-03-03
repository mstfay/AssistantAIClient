import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Drawer, List, ListItem, ListItemText, CircularProgress, Tooltip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchOldConversations } from "../api/chat";
import { isTokenValid, getUserInfo } from "../api/auth";
import PushPinIcon from "@mui/icons-material/PushPin"; // Raptiye ikonu

const Navbar = ({ toggleSidebar }) => {
  const isAuthenticated = isTokenValid();
  const user = getUserInfo();
  const location = useLocation();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false); // Drawer pinlendi mi?
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      loadConversations();
    }
  }, [drawerOpen]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      let pageType = "";
      if (location.pathname.includes("chatbot")) pageType = "chatbot";
      else if (location.pathname.includes("pdf-summarizer")) pageType = "pdf-summarizer";
      else if (location.pathname.includes("image-editor")) pageType = "image-editor";

      if (pageType) {
        const data = await fetchOldConversations(pageType);
        setConversations(data);
      }
    } catch (error) {
      console.error("Konuşmaları yüklerken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrawerToggle = () => {
    if (!isPinned && ["/chatbot", "/pdf-summarizer", "/image-editor"].some(path => location.pathname.includes(path))) {
      setDrawerOpen(!drawerOpen);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setDrawerOpen(false);
    }
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  const handleTitleClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ width: "100%", zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            onClick={handleTitleClick}
            sx={{ cursor: "pointer" }}
          >
            AssistantAI
          </Typography>

          <Box>
            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
                </Button>
                <IconButton
                  onClick={() => {
                    toggleSidebar();
                  }}
                >
                  <Avatar src={user?.profilePicture || "/default-avatar.png"} alt="Profil" />
                </IconButton>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Giriş Yap
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Kayıt Ol
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {isAuthenticated && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onMouseLeave={handleMouseLeave} // Fare drawer dışına çıkınca kapanır (eğer pinlenmemişse)
        >
          <List sx={{ width: 250 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
              <Typography variant="h6">Eski Konuşmalar</Typography>
              <Tooltip title={isPinned ? "Raptiyeyi Kaldır" : "Raptiyele"}>
                <IconButton onClick={togglePin}>
                  <PushPinIcon color={isPinned ? "primary" : "disabled"} />
                </IconButton>
              </Tooltip>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              conversations.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemText primary={item.title || `Konuşma ${index + 1}`} />
                </ListItem>
              ))
            )}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
