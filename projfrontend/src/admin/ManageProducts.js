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
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import {
  createCategory,
  createProduct,
  getAllCategories,
  getAllProducts,
} from "./helper/adminapicall";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const theme = useTheme();

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

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //   };

  return (
    <Stack>
      <Typography variant="h4">
        {`There are ${products.length} Products in the store!`}
      </Typography>
      {products &&
        products.map((product, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">{product.names}</Typography>
              <Button sx={buttonsizing}>Update</Button>
              <Button sx={buttonsizing}>Delete</Button>
            </Box>
          );
        })}

      <ToastContainer />
    </Stack>
  );
};

export default ManageProduct;
