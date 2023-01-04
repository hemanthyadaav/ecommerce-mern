import {
  Button,
  TextField,
  useTheme, Stack
} from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();
  const theme = useTheme();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // backend call
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
          console.log(data.error);
          return toast.error(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
          return toast.success("Category Created Successfully!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Stack component="form" onSubmit={onSubmit}>
      <TextField
        sx={{
          width: {
            md: "40%",
            xs: "80%",
          },
          mx: {
            md: "30%",
            xs: "10%",
          },
        }}
        required
        id="outlined-required"
        autoFocus
        placeholder="Eg. Big Billion Days Sale"
        label="Create Category"
        onChange={handleChange}
        value={name}
      />
      <Button
        sx={{
          mt: 2,
          width: {
            md: "40%",
            xs: "80%",
          },
          mx: {
            md: "30%",
            xs: "10%",
          },
          color: "white",
        }}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Create
      </Button>
      <ToastContainer />
    </Stack>
  );
};

export default AddCategory;
