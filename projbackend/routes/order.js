const express = require("express");
const router = express.Router();

const {
  isSignedIn,
  isAuthorized,
  isAdmin,
} = require("../controllers/authentication");
const { updateInventory } = require("../controllers/product");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// routes

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthorized,
  pushOrderInPurchaseList,
  updateInventory,
  createOrder
);

router.get(
  "order/all/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  getAllOrders
);

// status of order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  updateStatus
);

module.exports = router;
