import React from "react";
import { Container, Typography } from "@mui/material";

const UserManagement = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4">Kullanıcı Yönetimi</Typography>
      <Typography>Admin panelinden kullanıcıları yönetebilirsiniz.</Typography>
    </Container>
  );
};

export default UserManagement;
