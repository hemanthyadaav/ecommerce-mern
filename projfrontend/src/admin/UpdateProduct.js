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
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import { MPRODUCT } from "../links";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = () => {
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
    error: "",
    updatedProduct: "",
    getARedirect: false,
    formData: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    updatedProduct,
    photo,
    formData,
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

  const preload = (productId) => {
    setLoading(true);
    getProduct(productId)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          getAllCategories()
            .then((data) => {
              if (data.error) {
                setValues({ ...values, error: data.error });
              } else {
                setValues({ categories: data });
                console.log("CATEGORIES: ", data);
              }
            })
            .catch((err) => console.log(err));
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            photo: data.photo,
            category: data.category?._id,
          });
          setLoading(false);
          console.log("CATEGORY", data.category._id);
        }
      })
      .catch((err) => console.log(err));
  };

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    preload(id);
  }, []);

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    // formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    setValues({ ...values, error: "" });
    updateProduct(id, user._id, token, {
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
          console.log("UPDATED DATA: ", data);
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            category: "",
            updatedProduct: data.name,
          });
          toast.success(`${data.name} Updated Successfully!`);
          // setLoading(false);
          setTimeout(() => {
            return navigate(MPRODUCT);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };
  // {loading ?}
  return !loading ? (
    <Stack component="form" onSubmit={onSubmit}>
      <TextField
        sx={sizing}
        required
        id="outlined-required"
        autoFocus
        placeholder="Eg. SweatShirt"
        label="Product Name"
        InputLabelProps={{ shrink: name === "" ? false : true }}
        onChange={handleChange("name")}
        value={name}
      />
      <TextField
        sx={sizing}
        label="Description"
        InputLabelProps={{ shrink: description !== "" ? true : false }}
        onChange={handleChange("description")}
        value={description}
      />

      <TextField
        sx={sizing}
        required
        placeholder="Eg. https://example.com/tshirt.jpg"
        label="Image URL"
        onChange={handleChange("photo")}
        InputLabelProps={{ shrink: stock !== "" ? true : false }}
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
          InputLabelProps={{ shrink: price !== "" ? true : false }}
          onChange={handleChange("price")}
        />
      </FormControl>

      <TextField
        sx={sizing}
        required
        placeholder="Eg. 20"
        label="Quantity"
        InputLabelProps={{ shrink: stock !== "" ? true : false }}
        onChange={handleChange("stock")}
        value={stock}
      />
      <FormControl required sx={sizing}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          InputLabelProps={{ shrink: category !== "" ? true : false }}
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
        Update
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

export default UpdateProduct;
