const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const user = require("../models/user");
var jwt = require("jsonwebtoken");
var { expressjwt } = require("express-jwt");
require("dotenv").config();

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      parameter: errors.array()[0].param,
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    return res.json({
      name: user.firstName + " " + user.lastName,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      parameter: errors.array()[0].param,
      error: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;
  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "USER email does not exists!",
        });
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and Password does not match",
        });
      }

      //create token
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.SECRET
      );

      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      //send response to front end
      const { _id, firstName, email, role } = user;
      return res.json({
        token,
        user: { _id, firstName, email, role },
      });
    }
  );
};

exports.signout = (req, res) => {
  return res.json({
    message: "User Signout!",
  });
};
