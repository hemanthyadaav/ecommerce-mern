import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Signin() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Sign In Form
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 2, color: "white" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
