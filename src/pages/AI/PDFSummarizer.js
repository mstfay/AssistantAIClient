import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";

const PDFSummarizer = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          PDF Özetleyici
        </Typography>
        <Button variant="contained" component="label">
          PDF Yükle
          <input type="file" hidden />
        </Button>
      </Paper>
    </Container>
  );
};

export default PDFSummarizer;