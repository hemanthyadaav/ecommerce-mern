import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import {
  getTokenFromBackend,
  processPaymentFromBackend,
} from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import { Typography, Button, Grid } from "@mui/material";
import { loadCart } from "./helper/CartHelper";
import { useNavigate } from "react-router";
import { HOME } from "../links";

const PaymentUI = ({ setReload = (f) => f, reload = undefined }) => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState({});
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const navigate = useNavigate();
  const onPurchase = () => {
    let nonce;
    let getNonce = instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          nonceFromTheClient: nonce,
          amount: getAmount(),
        };
        processPaymentFromBackend(user._id, token, paymentData)
          .then((res) => {
            if (res.error) {
              return toast.error(res.error);
            }
            localStorage.removeItem("cart");
            toast.success("Payment Successful...! ", {
              autoClose: 2500,
            });
            setTimeout(() => {
              navigate(HOME);
            }, 3000);
          })
          .catch((err) => toast.error(err));
      })
      .catch((err) => console.log(err));
  };

  const getProducts = () => {
    setProducts(loadCart());
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => (amount = amount + p.price));
    return amount;
  };

  const getToken = (userId, token) => {
    getTokenFromBackend(userId, token)
      .then((res) => {
        if (res.error) {
          return toast.error(res.error);
        }
        // console.log(res);

        setClientToken(res.clientToken);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getToken(user._id, token);
    getProducts();
  }, []);

  return (
    <>
      {clientToken !== null ? (
        <Grid
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item md={6} xs={10}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", my: 1 }}
              color="secondary"
            >
              Amount: {getAmount()}
            </Typography>
            <DropIn
              options={{ authorization: clientToken }}
              onInstance={(instance) => setInstance(instance)}
            />
          </Grid>

          <Grid item>
            <Button
              sx={{ color: "white", my: 1 }}
              variant="contained"
              onClick={onPurchase}
            >
              Purchase
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography
          sx={{ textAlign: "center", my: 3 }}
          color="secondary"
          variant="h6"
        >
          Loading payment gateway in a moment, please wait...!
        </Typography>
      )}
      <ToastContainer />
    </>
  );
};

export default PaymentUI;
