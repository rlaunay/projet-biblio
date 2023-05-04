import { Alert, Box, Button, Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField } from "@/components/Form/Input/TextField";
import { RegisterPayload, useRegister } from "@/queries/auth/register";

export function Register() {
  const { register, isLoading, error } = useRegister();
  const { control, handleSubmit } = useForm<RegisterPayload>();

  function submitHandler(data: RegisterPayload) {
    register(data);
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
            disabled={isLoading}
            control={control}
            rules={{
              required: "Email requis",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email invalid",
              },
            }}
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
            disabled={isLoading}
            control={control}
            rules={{
              required: "Mot de passe requis",
              minLength: {
                value: 4,
                message: "Mot de passe trop court (min 4 caractères)",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password_confirmation"
            label="Confimer mot de passe"
            type="password"
            id="password_confirmation"
            autoComplete="confirm-password"
            disabled={isLoading}
            control={control}
            rules={{
              validate: (value, formValues) =>
                value === formValues.password || "Confirmation invalid",
            }}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
      >
        Créer un compte
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/auth/login" component={RouterLink} variant="body2">
            Déjà un compte ? Connexion
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
