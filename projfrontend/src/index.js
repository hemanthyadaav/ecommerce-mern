import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import MyRoutes from "./MyRoutes";
import { theme } from "./theme";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MyRoutes />
    </ThemeProvider>
  </React.StrictMode>
);
