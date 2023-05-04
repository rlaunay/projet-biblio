import { Alert, Box, Button, Grid } from "@mui/material";
import { TextField } from "@/components/Form/Input/TextField";
import { useResetPassword, ResetPasswordPayload } from "@/hooks/resetPassword";
import { useForm } from "react-hook-form";

export function ResetPassword() {
  const { isValid, error, isLoading, resetPassword, success } =
    useResetPassword();
  const { control, handleSubmit } = useForm<ResetPasswordPayload>();

  if (isValid === null) {
    return <h1>Loading...</h1>;
  }

  if (!isValid) {
    return (
      <>
        <h1>Error</h1>
        <p>Signature ou URL invalide</p>
      </>
    );
  }

  function submitHandler(payload: ResetPasswordPayload) {
    resetPassword(payload);
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
          Une erreur est survenue
        </Alert>
      )}
      {success && (
        <Alert sx={{ mb: 2 }} severity="success">
          Mot de passe modifier !
        </Alert>
      )}
      <Grid container spacing={2}>
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
              required: "Confirmation requise",
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
        Changer mot de passe
      </Button>
    </Box>
  );
}
