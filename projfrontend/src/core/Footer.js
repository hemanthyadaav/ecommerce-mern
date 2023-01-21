import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";

function Footer() {
  return (
    <Box
      sx={{
        position: {
          xs: "sticky",
          md: "absolute",
        },
        bottom: 0,
        background: "#35BDD0",
        width: "100%",
        py: 2,
        textAlign: "center",
        mt: 2,
      }}
    >
      <CssBaseline />
      <Typography sx={{ color: "white" }}>
        &copy; E-Commerce Store 2022 - 2023
      </Typography>
    </Box>
  );
}

export default Footer;
