import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../backend";
import "../styles.css";
import { getAllProducts } from "./helper/coreapicalls";
import ProductCard from "./ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    getAllProducts()
      .then((data) => {
        if (data.error) {
          return toast.error(data.error);
        } else {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return !loading ? (
    <Grid
      container
      // spacing={0.5}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {products.map((product, index) => {
        return (
          <Grid item key={index} md={3} sx={{ ml: { md: 2 }, my: 2 }}>
            <ProductCard product={product} addToCart={true} />
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

export default Home;
