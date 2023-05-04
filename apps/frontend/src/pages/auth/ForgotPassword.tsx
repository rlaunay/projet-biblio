import { Alert, Box, Button, Grid, Link } from "@mui/material";
import { TextField } from "@/components/Form/Input/TextField";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import http from "@/services/http";
import { useState } from "react";

type ForgotPasswordPayload = {
  email: string;
};

export function ForgotPassword() {
  const { control, handleSubmit } = useForm<ForgotPasswordPayload>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function submitHandler(data: ForgotPasswordPayload) {
    setError(false);
    setSuccess(false);
    setIsLoading(true);
    http
      .post("/auth/forgot-password", data)
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(submitHandler)}
      sx={{ mt: 3 }}
    >
      {error && (
        <Alert sx={{ mb: 2 }} severity="error">
          Une erreur est survenue reéssayer ultérierement !
        </Alert>
      )}
      {success && (
        <Alert sx={{ mb: 2 }} severity="success">
          Un email de réinitialisation de mot de passe a été envoyer
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
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? "Envoie..." : "Envoyer mail"}
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/auth/login" component={RouterLink} variant="body2">
            Connexion
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
