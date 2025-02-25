import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  TextField,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const API_URL = "https://localhost:7033/api/chatai";

const ChatApp = () => {
  // Sohbet başlıkları
  const [headers, setHeaders] = useState([]);
  // Seçili header (varsa)
  const [selectedHeader, setSelectedHeader] = useState(null);
  // Seçili header'a ait mesajlar
  const [messages, setMessages] = useState([]);
  // Mesaj girişi
  const [input, setInput] = useState("");

  // Header menüsü (düzenle/sil)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuHeaderId, setMenuHeaderId] = useState(null);

  const messagesEndRef = useRef(null);

  // Mesajlar güncellendiğinde en alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Komponent yüklendiğinde headerları çek
  useEffect(() => {
    fetchHeaders();
  }, []);

  // Headerları GET: {API_URL}/all-headers
  const fetchHeaders = async () => {
    try {
      const response = await fetch(`${API_URL}/all-headers`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        setHeaders(data.headers || []);
      }
    } catch (error) {
      console.error("Headerlar alınırken hata:", error);
    }
  };

  // Belirli header'a ait mesajları GET: {API_URL}/header-message-history/{headerId}
  const fetchMessages = async (headerId) => {
    try {
      const response = await fetch(`${API_URL}/header-message-history/${headerId}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.chatMessages || []);
      }
    } catch (error) {
      console.error("Mesajlar alınırken hata:", error);
    }
  };

  // Header tıklandığında
  const handleHeaderClick = (header) => {
    setSelectedHeader(header);
    fetchMessages(header.id);
  };

  // Yeni sohbet başlat (seçili header'ı temizle, mesajları sıfırla)
  const handleNewChat = () => {
    setSelectedHeader(null);
    setMessages([]);
  };

  // Header menüsünü aç
  const handleMenuOpen = (event, headerId) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setMenuHeaderId(headerId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuHeaderId(null);
  };

  // Düzenleme ve silme işlemleri (API entegrasyonuna göre güncellenebilir)
  const handleEditHeader = () => {
    console.log("Edit header:", menuHeaderId);
    // Burada düzenleme modal'ı açılabilir.
    handleMenuClose();
  };

  const handleDeleteHeader = () => {
    console.log("Delete header:", menuHeaderId);
    // API çağrısı ile header silindikten sonra listeyi güncelle.
    setHeaders(headers.filter((h) => h.id !== menuHeaderId));
    if (selectedHeader && selectedHeader.id === menuHeaderId) {
      setSelectedHeader(null);
      setMessages([]);
    }
    handleMenuClose();
  };

  // Mesaj gönderme POST: {API_URL}/send-message
  const handleSend = async () => {
    if (!input.trim()) return;

    // POST edilecek veri:
    // Eğer header seçili ise HeaderId gönder, aksi halde boş string (backend yeni header oluşturacak)
    const payload = {
      Message: input,
      HeaderId: selectedHeader ? selectedHeader.id : "",
    };

    try {
      const response = await fetch(`${API_URL}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      });
      const res = await response.json();
      if (res.success) {
        // Gönderilen kullanıcı mesajını ve backend tarafından dönen bot yanıtını ekle.
        const newUserMessage = { text: input, sender: "user" };
        const newBotMessage = { text: res.data, sender: "bot" };

        setMessages((prev) => [...prev, newUserMessage, newBotMessage]);

        // Eğer yeni bir header oluşturulduysa, header listesini yeniden çek
        if (!selectedHeader) {
          fetchHeaders();
          // Dönen response'dan yeni header bilgilerini alıp setSelectedHeader yapılabilir.
        } else {
          // Mevcut header ise, yeniden mesajları çekmek için:
          fetchMessages(selectedHeader.id);
        }
      } else {
        console.error("Mesaj gönderme hatası:", res.message);
      }
    } catch (error) {
      console.error("Mesaj gönderilirken hata:", error);
    }
    setInput("");
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex", height: "90vh", py: 2 }}>
      {/* Sol Sidebar: Header Listesi */}
      <Box
        sx={{
          width: "25%",
          borderRight: "1px solid #ccc",
          p: 2,
          overflowY: "auto",
        }}
      >
        <Button variant="contained" fullWidth onClick={handleNewChat} sx={{ mb: 2 }}>
          Yeni Sohbet Başlat
        </Button>
        <List>
          {headers.map((header) => (
            <ListItem
              key={header.id}
              button
              onClick={() => handleHeaderClick(header)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <ListItemText primary={header.title} />
              <IconButton edge="end" onClick={(e) => handleMenuOpen(e, header.id)}>
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEditHeader}>Başlığı Düzenle</MenuItem>
          <MenuItem onClick={handleDeleteHeader}>Başlığı Sil</MenuItem>
        </Menu>
      </Box>

      {/* Sağ Panel: Sohbet Alanı */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
        <Typography variant="h4" gutterBottom>
          {selectedHeader ? selectedHeader.title : "Chatbot"}
        </Typography>
        <Paper sx={{ flexGrow: 1, p: 2, overflowY: "auto", mb: 2 }}>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  backgroundColor: message.sender === "user" ? "#1976d2" : "#f5f5f5",
                  color: message.sender === "user" ? "#fff" : "#000",
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
              </Paper>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Paper>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Mesajınızı yazın..."
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button variant="contained" onClick={handleSend}>
            Gönder
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatApp;
