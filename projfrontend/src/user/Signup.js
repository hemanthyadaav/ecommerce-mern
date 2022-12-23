import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { signup } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { firstName, lastName, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    return signup({ firstName, lastName, email, password })
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error, success: false });
          toast.error(data.error);
        } else {
          setValues({
            ...values,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
          toast.success("SignUp Successfull!");
        }
      })
      .catch((err) => console.log("Error on Sign Up!", err));
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
          Sign Up Form
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                onChange={handleChange("firstName")}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="lastName"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                autoFocus
                onChange={handleChange("lastName")}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange("email")}
                value={email}
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
                onChange={handleChange("password")}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 2, color: "whitesmoke" }}
            type="submit"
            fullWidth
            variant="contained"
            onClick={onSubmit}
          >
            Sign Up
          </Button>
        </form>
        <Typography>{JSON.stringify(values)}</Typography>
        <ToastContainer />
      </div>
    </Container>
  );
}
