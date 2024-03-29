import {
  Button,
  useTheme,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./helper/adminapicall";
import { useNavigate } from "react-router";
import { UPRODUCT } from "../links";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    setLoading(true);
    getAllProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
          console.log(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const theme = useTheme();

  const buttonsizing = {
    width: {
      md: "40%",
      xs: "80%",
    },
    mx: {
      md: "30%",
      // xs: "10%",
    },
    fontSize: {
      xs: "small",
    },
    py: 1,
  };

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    backgroundColor: "#fff",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  const deleteProductWithId = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          return toast.error(data.error);
        } else {
          toast.success("Deleting Product...!");
          preload();
        }
      })
      .catch((err) => {
        return toast.error(err);
      });
  };

  const navigate = useNavigate();
  const updateProduct = (productId) => {
    return navigate(UPRODUCT + `/${productId}`);
  };

  return !loading ? (
    <Grid>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 3 }}>
        {`There are ${products.length} Products in the store!`}
      </Typography>
      {products &&
        products.map((product, index) => {
          return (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 4,
              }}
            >
              <Grid item sm={2}></Grid>
              <Grid
                item
                sm={4}
                xs={6}
                sx={{
                  pl: {
                    xs: 1.5,
                    sm: 2,
                  },
                  fontSize: {
                    xs: "small",
                    sm: "medium",
                  },
                  fontWeight: {
                    xs: 500,
                  },
                }}
              >
                <Item>{`${product.name}`}</Item>
              </Grid>
              <Grid item sm={2} xs={2} sx={{ mx: 2 }}>
                <Button
                  variant="contained"
                  sx={buttonsizing}
                  style={{ color: "white" }}
                  disableElevation
                  onClick={() => updateProduct(product._id)}
                >
                  Edit
                </Button>
              </Grid>

              <Grid item sm={2} xs={2}>
                <Button
                  variant="outlined"
                  sx={buttonsizing}
                  disableElevation
                  color="error"
                  onClick={() => deleteProductWithId(product._id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          );
        })}

      <ToastContainer />
    </Grid>
  ) : (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default ManageProduct;
