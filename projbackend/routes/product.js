const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  isAuthorized,
  isAdmin,
} = require("../controllers/authentication");
const {
  getProductById,
  getProduct,
  createProduct,
  getPhoto,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// routes
router.get("/product/all", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  updateProduct
);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  createProduct
);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  deleteProduct
);


module.exports = router;
