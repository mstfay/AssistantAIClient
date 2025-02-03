import React from "react";
import { Container, Typography } from "@mui/material";

const Premium = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4">Premium İçerik</Typography>
      <Typography>Bu içerik sadece premium kullanıcılar içindir.</Typography>
    </Container>
  );
};

export default Premium;
