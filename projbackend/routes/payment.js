const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthorized } = require("../controllers/authentication");
const { getToken, processPayment } = require("../controllers/payment");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);

// routes
router.get("/payment/gettoken/:userId", isSignedIn, isAuthorized, getToken);
router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthorized,
  processPayment
);

module.exports = router;
