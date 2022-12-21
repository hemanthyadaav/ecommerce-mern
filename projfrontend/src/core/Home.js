import React from "react";
import { API } from "../backend";
import "../styles.css";
import StickyFooter from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-white text-center display-6">{API}</h1>;
      <StickyFooter />
    </>
  );
};

export default Home;
