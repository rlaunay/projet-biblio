import { Avatar, Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Copyright } from "./Copyright";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export function AuthLayout() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Outlet />
        <Copyright />
      </Box>
    </Container>
  );
}
