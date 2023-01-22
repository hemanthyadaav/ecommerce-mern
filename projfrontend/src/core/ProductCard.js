import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardActions,
  CircularProgress,
  Grid,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { addItemToCart } from "./helper/CartHelper";
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ product, addToCart = true }) => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const addProductToCart = () => {
    setLoading(true);
    addItemToCart(product, () => {
      toast.success("Item added to Cart!", {
        hideProgressBar: true,
      });
      setTimeout(() => {
        return navigate("/cart");
      }, 3000);
    });
    setLoading(false);
  };

  const buttonsizing = {
    width: "100%",
    py: 1,
  };
  return !loading ? (
    <Card sx={{ maxWidth: 345, width: { xs: 300 } }}>
      <ToastContainer />
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={product.photo}
          alt="T-shirt image"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            textAlign="center"
            gutterBottom
            variant="h5"
            component="div"
            fontWeight="520"
            color="secondary"
          >
            {product.name.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {product.description.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
              letter.toUpperCase()
            )}
          </Typography>
          <Chip
            sx={{ mt: 2 }}
            label={`Stock - ${product.stock}`}
            variant="outlined"
            color="info"
            // avatar={<Avatar>₹</Avatar>}
          />
          <Chip
            sx={{ mt: 2, ml: 1 }}
            label={`${product.price}/-`}
            variant="outlined"
            color="info"
            avatar={<Avatar>₹</Avatar>}
          />
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          mb: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {addToCart && (
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                sx={buttonsizing}
                style={{ color: "white" }}
                disableElevation
                onClick={addProductToCart}
              >
                Add to Cart
              </Button>
            </Grid>
          )}
          {!addToCart && (
            <Grid item>
              <Button
                color="error"
                variant="outlined"
                sx={buttonsizing}
                disableElevation
              >
                Remove from Cart
              </Button>
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  ) : (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default ProductCard;
