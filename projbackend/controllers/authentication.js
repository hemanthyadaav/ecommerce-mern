const User = require("../models/user");
const { body, validationResult } = require("express-validator");
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
  const { email } = req.body;
  const user = new User(req.body);
  User.findOne(
    {
      email,
    },
    (error, user) => {
      if (error || user) {
        return res.status(400).json({
          error: "User email exists!",
        });
      } else {
        user.save((error, user) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              error: "Not able to save user in DB",
            });
          }
          return res.json({
            name: user.firstName + " " + user.lastName,
            email: user.email,
            id: user._id,
          });
        });
      }
    }
  );
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
    (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "user email does not exists!",
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
  res.clearCookie("token");
  return res.json({
    message: "User Signout!",
  });
};

//for protected routes
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//custom middlewares
exports.isAuthorized = (req, res, next) => {
  //profile will be coming up the frontend when the user would be created
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error:
        "You are not authorized to do this operation, please make sure you have proper rights to do so...!",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  //again, profile is coming up from the frontend when the user would be created
  if (req.profile.role !== 1) {
    return res.status(403).json({
      error: "You are not an ADMIN!!!",
    });
  }

  next();
};
