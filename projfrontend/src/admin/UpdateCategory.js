import {
  Button,
  TextField,
  useTheme,
  Stack, Box
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import { MCATEGORY } from "../links";
import {
  getCategory, updateCategory
} from "./helper/adminapicall";

const UpdateCategory = () => {
  const theme = useTheme();

  const { user, token } = isAuthenticated();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const preload = (categoryId) => {
    setLoading(true);
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          return toast.error(data.error);
        } else {
          console.log(data);
          setName(data.name);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    preload(id);
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // backend call
    updateCategory(id, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return toast.error(data.error);
        } else {
          setName("");
          toast.success("Category Updated Successfully!");
          setTimeout(() => {
            return navigate(MCATEGORY);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  // {loading ?}
  return !loading ? (
    <Stack component="form" onSubmit={onSubmit}>
      <TextField
        sx={{
          width: {
            md: "40%",
            xs: "80%",
          },
          mx: {
            md: "30%",
            xs: "10%",
          },
        }}
        required
        id="outlined-required"
        autoFocus
        placeholder="Eg. Big Billion Days Sale"
        label="Create Category"
        onChange={handleChange}
        value={name}
      />
      <Button
        sx={{
          mt: 2,
          width: {
            md: "40%",
            xs: "80%",
          },
          mx: {
            md: "30%",
            xs: "10%",
          },
          color: "white",
        }}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Update
      </Button>
      <ToastContainer />
    </Stack>
  ) : (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default UpdateCategory;
