import { Typography } from "@mui/material";
import React from "react";
import { API } from "../backend";
import "../styles.css";

const Home = () => {
  return (
    <>
      <Typography variant="h5">{API}</Typography>
    </>
  );
};

export default Home;
