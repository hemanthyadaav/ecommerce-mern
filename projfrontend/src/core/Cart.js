import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { loadCart } from "./helper/CartHelper";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    setProducts(loadCart());
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return !loading ? (
    <Fragment>
      <Grid
        container
        // flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          // md={8}
          item
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          {products.map((product, index) => {
            return (
              <Grid item key={index} md={3} sx={{ ml: { md: 1 }, my: 2 }}>
                <ProductCard product={product} addToCart={false} />
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
