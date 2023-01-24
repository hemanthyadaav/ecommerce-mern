const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthorized } = require("../controllers/authentication");
const { getToken, processPayment } = require("../controllers/payment");

router.get("/payment/gettoken/:userId", isSignedIn, getToken);
router.post("/payment/braintree/:userId", isSignedIn, processPayment);

module.exports = router;
