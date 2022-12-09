const express = require("express");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/authentication");
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

router.post(
  "/signin",
  check("email").isEmail().withMessage("Email should be valid!"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long!"),
  signin
);

router.get("/signout", signout);

router.get("/protected", isSignedIn, (req, res) => {
  res.status(200).json({
    message: "This is a protected Route!"
  })
});

module.exports = router;
