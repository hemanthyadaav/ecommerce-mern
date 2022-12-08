const express = require("express");
const router = express.Router();
const { signout, signup } = require("../controllers/authentication");
const { check, validationResult } = require("express-validator");

//actual routes
router.post(
  "/signup",
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 3 chars long!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long!"),
  check("email").isEmail().withMessage("Email should be valid!"),
  signup
);
router.get("/signout", signout);

module.exports = router;
