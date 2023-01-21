import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  CardActionArea,
  CardActions,
  Grid,
} from "@mui/material";
import Chip from "@mui/material/Chip";

const ProductCard = ({ product, addToCart = true }) => {
  const buttonsizing = {
    width: "100%",
    py: 1,
    minWidth: "200px",
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
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
  );
};

export default ProductCard;
