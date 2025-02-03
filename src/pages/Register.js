import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(formData);

    console.log("Server Yanıtı:", response.message); // Server mesajını yazdır

    if (response.success) {
      setSnackbarMessage(response.message || "Kayıt başarılı!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/login"), 2000); // Başarı sonrası login sayfasına yönlendir
    } else {
      setSnackbarMessage(response.message || "Kayıt başarısız!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Kayıt Ol
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Ad" name="firstName" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Soyad" name="lastName" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Kullanıcı Adı" name="userName" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="E-posta" name="email" type="email" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Telefon Numarası" name="phoneNumber" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Şifre" name="password" type="password" margin="normal" onChange={handleChange} required />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Kayıt Ol
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
