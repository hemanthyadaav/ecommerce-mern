import { Typography } from "@mui/material";
import React from "react";

const NotFound = ({ desc = "You are not allowed to access this page!!" }) => {
  return (
    <Typography sx={{ textAlign: "center" }} variant="h4">
      {desc}
    </Typography>
  );
};

export default NotFound;
