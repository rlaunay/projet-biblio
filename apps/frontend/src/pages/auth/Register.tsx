import { Box, Button, Grid, Link, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function Register() {
  return (
    <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confimer mot de passe"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
