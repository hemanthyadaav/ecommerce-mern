import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import { APP_NAME } from "../backend";
import {
  ADASHBOARD,
  CART,
  CCATEGORY,
  CPRODUCT,
  DASHBOARD,
  HOME,
  MORDERS,
  MPRODUCT,
  SIGNIN,
  SIGNUP,
} from "../links";
import { theme } from "../theme";

const drawerWidth = 240;
const navItems = ["Home", "Cart", "DashBoard"];

const adminBoardItems = [
  "Home",
  "Create-Product",
  "Create-Category",
  "Manage-Products",
  "Manage-Orders",
];

const adminLinks = {
  Home: HOME,
  "Create-Product": CPRODUCT,
  "Create-Category": CCATEGORY,
  "Manage-Products": MPRODUCT,
  "Manage-Orders": MORDERS,
};

const links = {
  Home: HOME,
  Cart: CART,
  Dashboard: DASHBOARD,
  Signup: SIGNUP,
  SignIn: SIGNIN,
};

function Navbar(props) {
  const navigate = useNavigate();

  const handleClick = (url) => {
    return navigate(url);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSignout = () => {
    signout(() => {
      return navigate(SIGNIN);
    });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {APP_NAME}
      </Typography>
      <Divider />
      <List>
        {isAuthenticated() &&
          isAuthenticated().user.role === 0 &&
          navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => handleClick(links[item])}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        {isAuthenticated() &&
          isAuthenticated().user.role === 1 &&
          adminBoardItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => handleClick(adminLinks[item])}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}

        {!isAuthenticated() && (
          <Fragment>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => handleClick(links["Signup"])}
              >
                <ListItemText primary={"Signup"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => handleClick(links["SignIn"])}
              >
                <ListItemText primary={"SignIn"} />
              </ListItemButton>
            </ListItem>
          </Fragment>
        )}
        {isAuthenticated() && (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={handleSignout}
            >
              <ListItemText primary={"SignOut"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "#35BDD0" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "white",
            }}
          >
            {APP_NAME}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isAuthenticated() &&
              isAuthenticated().user.role === 0 &&
              navItems.map((item, index) => (
                <Button
                  key={index}
                  sx={{ color: "white" }}
                  onClick={() => handleClick(links[item])}
                >
                  {item}
                </Button>
              ))}
            {isAuthenticated() &&
              isAuthenticated().user.role === 1 &&
              adminBoardItems.map((item, index) => (
                <Button
                  key={index}
                  sx={{ color: "white" }}
                  onClick={() => handleClick(adminLinks[item])}
                >
                  {item}
                </Button>
              ))}
            {!isAuthenticated() && (
              <Fragment>
                <Button
                  sx={{ color: "white" }}
                  onClick={() => handleClick(links["Signup"])}
                >
                  Signup
                </Button>
                <Button
                  sx={{ color: "white" }}
                  onClick={() => handleClick(links["SignIn"])}
                >
                  SignIn
                </Button>
              </Fragment>
            )}
            {isAuthenticated() && (
              <Button sx={{ color: "white" }} onClick={handleSignout}>
                SignOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
