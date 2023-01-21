import { Grid, Typography } from "@mui/material";
import React from "react";
import { API } from "../backend";
import "../styles.css";
import ProductCard from "./ProductCard";

const Home = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        my: 4,
        // mx: 2,
      }}
    >
      <Grid item>
        <ProductCard />
      </Grid>
    </Grid>
  );
};

export default Home;
