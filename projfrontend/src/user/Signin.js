import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { authenticate, isAuthenticated, signin } from "../auth/helper";

export default function Signin() {
  const [values, setValues] = useState({
    email: "a@gmail.com",
    password: "12345",
    error: false,
    isLoading: false,
    didRedirect: false,
  });
  let navigate = useNavigate();

  const { email, password, error, isLoading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, isLoading: true });
    return signin({ email, password })
      .then((data) => {
        if (data?.error) {
          console.log(data.error);
          toast.error(data.error);
          setValues({ ...values, error: data.error, isLoading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true, isLoading: false });
            toast.success("SignIn Successfull!");
            return navigate("/");
          });
        }
      })
      .catch((err) => console.log("Error on Sign IN!", err));
  };

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
                label="Email Address"
                name="email"
                value={email}
                onChange={handleChange("email")}
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
                value={password}
                onChange={handleChange("password")}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 2, color: "white" }}
            type="submit"
            fullWidth
            variant="contained"
            onClick={onSubmit}
          >
            Sign In
          </Button>
        </form>
        {isLoading && (
          <Box
            sx={{
              mt: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress disableShrink />
          </Box>
        )}
        <ToastContainer />
      </div>
    </Container>
  );
}
