const express = require("express");
const router = express.Router();
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const {
  isSignedIn,
  isAdmin,
  isAuthorized,
} = require("../controllers/authentication");

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// routes

// put normal routes without params on top always to avoid problems
router.get("/category/all", getAllCategories);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  createCategory
);

router.get("/category/:categoryId", getCategory);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthorized,
  isAdmin,
  deleteCategory
);

module.exports = router;
