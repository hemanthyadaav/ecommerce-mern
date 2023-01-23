import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { loadCart } from "./helper/CartHelper";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const getProducts = () => {
    setLoading(true);
    setProducts(loadCart());
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  return !loading ? (
    <Fragment>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          // md={8}
          item
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ pl: { md: 6 } }}
        >
          {products.map((product, index) => {
            return (
              <Grid item key={index} md={3} sx={{ my: 2 }}>
                <ProductCard
                  product={product}
                  addToCart={false}
                  reload={reload}
                  setReload={setReload}
                />
              </Grid>
            );
          })}

          <ToastContainer />
        </Grid>

        <Grid item>
          <Button
            sx={{
              mt: {
                md: 6,
                xs: 4,
              },
              // color: "white",
              //   position: "fixed",
            }}
            onClick={() => {
              return navigate("/");
            }}
            variant="outlined"
            disableElevation
          >
            Back to Home
          </Button>
        </Grid>

        <Grid item>
          <Button
            sx={{
              mt: 2,
              color: "white",
              //   position: "fixed",
            }}
            variant="contained"
            disableElevation
          >
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  ) : (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Cart;
