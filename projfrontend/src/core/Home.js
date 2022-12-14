import React from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";

const Home = () => {
  return (
    <Base>
      <h1 className="text-white">{API}</h1>
    </Base>
  );
};

export default Home;
