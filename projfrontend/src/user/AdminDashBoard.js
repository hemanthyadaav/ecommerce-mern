import { Typography } from "@mui/material";
import React from "react";
import { isAuthenticated } from "../auth/helper";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const AdminLeftSide = () => {
    return <Typography>Left Side</Typography>;
  };
  const AdminRightSide = () => {
    return <Typography>Right Side</Typography>;
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Welcome to Admin Dashboard!
      </Typography>
      {AdminLeftSide()}
      {AdminRightSide()}
    </>
  );
};

export default AdminDashBoard;
