import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../backend";
import "../styles.css";
import { getAllProducts } from "./helper/coreapicalls";
import ProductCard from "./ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          return toast.error(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid
      container
      spacing={6}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {products.map((product, index) => {
        return (
          <Grid item key={index}>
            <ProductCard addToCart={true} />
          </Grid>
        );
      })}

      <ToastContainer />
    </Grid>
  );
};

export default Home;
