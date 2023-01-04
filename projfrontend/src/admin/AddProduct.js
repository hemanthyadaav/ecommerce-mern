import {
  Button,
  TextField,
  useTheme,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { color } from "@mui/system";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddProduct = () => {
  const theme = useTheme();
  const [value, setValue] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const sizing = {
    mt: 2,
    width: {
      md: "40%",
      xs: "80%",
    },
    mx: {
      md: "30%",
      xs: "10%",
    },
  };

  const buttonsizing = {
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
  };

  const handleChange = (name) => (e) => {
    //
  };

  const onSubmit = () => {
    //
  };

  return (
    <Stack component="form" onSubmit={onSubmit}>
      <TextField
        sx={sizing}
        required
        id="outlined-required"
        autoFocus
        placeholder="Eg. SweatShirt"
        label="Product Name"
        onChange={handleChange}
        // value={name}
      />
      <TextField
        sx={sizing}
        label="Description"
        onChange={handleChange}
        // value={name}
      />

      <FormControl required>
        <InputLabel
          sx={{
            mt: 2,
            mx: {
              md: "30%",
              xs: "10%",
            },
          }}
        >
          Price
        </InputLabel>
        <OutlinedInput
          sx={sizing}
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">₹</InputAdornment>}
          label="Price"
        />
      </FormControl>

      <FormControl required sx={sizing}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={10}
          //   value={age}
          label="Category"
          //   onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <TextField
        sx={sizing}
        required
        placeholder="Eg. 20"
        label="Quantity"
        onChange={handleChange}
        // value={name}
      />
      <Button sx={sizing} variant="outlined" component="label">
        Product Photo
        <input type="file" hidden />
      </Button>
      <Button
        sx={buttonsizing}
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

export default AddProduct;
