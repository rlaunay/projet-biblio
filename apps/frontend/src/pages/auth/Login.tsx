import { Box, Grid, Button, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LoginPayload, useLogin } from "@/queries/auth/login";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/Form/Input/TextField";

export function Login() {
  const { login, error, isLoading } = useLogin();
  const { control, handleSubmit } = useForm<LoginPayload>();

  function submitHandler(data: LoginPayload) {
    login(data);
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(submitHandler)}
      sx={{ mt: 3 }}
    >
      {error !== null && (
        <Alert sx={{ mb: 2 }} severity="error">
          {error}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            rules={{ required: "Email requis" }}
            control={control}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="new-password"
            rules={{ required: "Mot de passe requis" }}
            control={control}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link
            to="/auth/forgot-password"
            component={RouterLink}
            variant="body2"
          >
            Mot de passe oublié ?
          </Link>
        </Grid>
        <Grid item>
          <Link to="/auth/register" component={RouterLink} variant="body2">
            Pas encore de compte ? Inscription
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
