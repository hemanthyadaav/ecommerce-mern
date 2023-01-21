import {
  Button,
  useTheme,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../auth/helper";

import { useNavigate } from "react-router";
import { deleteCategory, getAllCategories } from "./helper/adminapicall";
import { UCATEGORY } from "../links";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    setLoading(true);
    getAllCategories()
      .then((data) => {
        if (data.error) {
          return toast.error(data.error);
        } else {
          setCategories(data);
          setLoading(false);
          // return toast.success("Categories loaded Successfully!");
        }
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteCategoryWithId = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          return toast.error(data.error);
        } else {
          setTimeout(() => {
            preload();
          }, 2000);
          toast.success(`Deleting Category with id: ${categoryId}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  const updateCategory = (categoryId) => {
    return navigate(UCATEGORY + `/${categoryId}`);
  };

  const buttonsizing = {
    width: {
      md: "40%",
      xs: "80%",
    },
    mx: {
      md: "30%",
      // xs: "10%",
    },
    fontSize: {
      xs: "small",
    },
    py: 1,
  };

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    backgroundColor: "#fff",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return !loading ? (
    <Grid>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 3 }}>
        {`There are ${categories.length} Categories in the store!`}
      </Typography>
      {categories &&
        categories.map((cate, index) => {
          return (
            <Grid
              key={index}
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                my: 4,
              }}
            >
              <Grid item xs={0} sm={2}></Grid>
              <Grid
                item
                xs={6}
                sm={4}
                sx={{
                  pl: {
                    xs: 1.5,
                    sm: 2,
                  },
                  fontSize: {
                    xs: "small",
                    sm: "medium",
                  },
                  fontWeight: {
                    xs: 500,
                  },
                }}
              >
                <Item>{`${cate.name}`}</Item>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                sx={{
                  mx: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={buttonsizing}
                  style={{ color: "white" }}
                  disableElevation
                  onClick={() => updateCategory(cate._id)}
                >
                  Edit
                </Button>
              </Grid>

              <Grid item xs={2} sm={2}>
                <Button
                  variant="outlined"
                  sx={buttonsizing}
                  disableElevation
                  color="error"
                  onClick={() => deleteCategoryWithId(cate._id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          );
        })}

      <ToastContainer />
    </Grid>
  ) : (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default ManageCategory;
