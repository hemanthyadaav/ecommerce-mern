import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Footer from "./core/Footer";
import Home from "./core/Home";
import Navbar from "./core/Navbar";
import { ADASHBOARD, CCATEGORY, CPRODUCT, HOME, SIGNIN, SIGNUP } from "./links";
import AdminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path={HOME}
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={SIGNIN} element={<Signin />} />
        <Route
          path={CCATEGORY}
          element={
            <AdminRoutes>
              <AddCategory />
            </AdminRoutes>
          }
        />
        <Route
          path={CPRODUCT}
          element={
            <AdminRoutes>
              <AddProduct />
            </AdminRoutes>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
