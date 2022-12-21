import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./core/Footer";
import Home from "./core/Home";
import Navbar from "./core/Navbar";
import { HOME, SIGNIN, SIGNUP } from "./links";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={SIGNIN} element={<Signin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
