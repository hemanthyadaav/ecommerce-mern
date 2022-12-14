import React from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";

const Home = () => {
  return (
    <Base title="HomePage" description="This is the description of the page">
      <h1 className="text-white text-center display-6">{API}</h1>
    </Base>
  );
};

export default Home;
