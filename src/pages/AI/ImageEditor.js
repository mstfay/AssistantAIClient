import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";

const ImageEditor = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Görsel Düzenleyici
        </Typography>
        <Button variant="contained" component="label">
          Görsel Yükle
          <input type="file" hidden />
        </Button>
      </Paper>
    </Container>
  );
};

export default ImageEditor;