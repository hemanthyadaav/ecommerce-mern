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
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import { createProduct, getAllCategories } from "./helper/adminapicall";

const AddProduct = () => {
  const theme = useTheme();

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    categories: [],
    loading: false,
    error: "",
    createdProduct: "",
    getARedirect: false,
    // formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    photo,
    error,
    createdProduct,
    // formData,
    getARedirect,
  } = values;

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

  const preload = () => {
    setValues({ ...values, loading: true });
    getAllCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          return toast.error(data.error);
        } else {
          setValues({
            ...values,
            categories: data,
            loading: false,
            // formData: new FormData(),
          });
          console.log("CATEGORIES: ", data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    // formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    // createProduct(user._id, token, formData)
    createProduct(user._id, token, {
      name,
      price,
      description,
      stock,
      category,
      photo,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          console.log(data.error);
          return toast.error(data.error);
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            category: "",
            createdProduct: data.name,
          });
          return toast.success("Product Created Successfully!");
        }
      })
      .catch((err) => console.log(err));
  };

  return !loading ? (
    <Stack component="form" onSubmit={onSubmit}>
      <TextField
        sx={sizing}
        required
        id="outlined-required"
        autoFocus
        placeholder="Eg. SweatShirt"
        label="Product Name"
        onChange={handleChange("name")}
        value={name}
      />
      <TextField
        sx={sizing}
        label="Description"
        onChange={handleChange("description")}
        value={description}
      />
      <TextField
        sx={sizing}
        required
        placeholder="Eg. https://example.com/tshirt.jpg"
        label="Image URL"
        onChange={handleChange("photo")}
        value={photo}
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
          value={price}
          placeholder="Please enter Price"
          onChange={handleChange("price")}
        />
      </FormControl>

      <TextField
        sx={sizing}
        required
        placeholder="Eg. 20"
        label="Quantity"
        onChange={handleChange("stock")}
        value={stock}
      />
      {/* <Button sx={sizing} variant="outlined" component="label">
        Product Photo
        <input type="file" hidden onChange={handleChange("photo")} />
      </Button> */}

      <FormControl required sx={sizing}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange("category")}
        >
          {categories &&
            categories.map((cate, ind) => (
              <MenuItem key={ind} value={cate._id}>
                {cate.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

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
  ) : (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default AddProduct;
