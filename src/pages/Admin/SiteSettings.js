import React from "react";
import { Container, Typography } from "@mui/material";

const SiteSettings = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4">Site Ayarları</Typography>
      <Typography>Buradan site ayarlarını yönetebilirsiniz.</Typography>
    </Container>
  );
};

export default SiteSettings;
