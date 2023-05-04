import { Avatar, Box, Container, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "@/queries/auth/user";

export function AuthLayout() {
  const { data } = useUser();
  const { pathname } = useLocation();

  if (data) {
    return <Navigate to="/" />;
  }

  if (pathname === "/auth" || pathname === "/auth/") {
    return <Navigate to="/auth/login" />;
  }

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
          {pathname === "/auth/login" && "Connexion"}
          {pathname === "/auth/register" && "Inscription"}
          {pathname === "/auth/forgot-password" && "Mot de passe oublier"}
        </Typography>
        <Outlet />
      </Box>
    </Container>
  );
}
