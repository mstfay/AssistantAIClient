import React, { useState, useRef, useEffect } from "react";
import { Container, Typography, Paper, TextField, Button, Box, List, ListItem, ListItemText } from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);

      // Simulate a bot response
      setTimeout(() => {
        const botMessage = { text: "Bu bir bot yanıtıdır.", sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);

      setInput("");
    }
  };

  // Mesajlar güncellendiğinde en alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: messages.length === 0 ? "center" : "flex-end",
        alignItems: "center",
        mt: messages.length === 0 ? 0 : 5,
        mb: 5,
      }}
    >
      <Paper
        sx={{
          p: 3,
          width: "100%",
          maxHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Chatbot
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
          }}
        >
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: message.sender === "user" ? "#1976d2" : "#f5f5f5",
                    color: message.sender === "user" ? "#fff" : "#000",
                  }}
                >
                  <ListItemText primary={message.text} />
                </Paper>
              </ListItem>
            ))}
            {/* Sayfa sonuna kaydırmak için eklenen ref */}
            <div ref={messagesEndRef} />
          </List>
        </Box>
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
      </Paper>
    </Container>
  );
};

export default Chatbot;
