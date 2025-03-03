import React, { useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../api/auth";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Hoş Geldiniz!
        </Typography>
        <Typography variant="body1">
          AssistantAI'ye hoş geldiniz. Üye olup giriş yaparak daha fazla özelliğe erişebilirsiniz.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
