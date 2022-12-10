const express = require("express");
const User = require("../models/user");
const Order = require("../models/order");
const router = express.Router();

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `No user found with user id ${id}`,
      });
    }

    // since this method gets called only once, we set req.profile = user, so that we can call getUser function to return req.profile
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    {
      _id: req.profile._id,
    },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to update the user!",
        });
      }
      user.encry_password = undefined;
      user.salt = undefined;
      user.__v = undefined;
      res.status(200).json(user);
    }
  );
};

exports.getUserPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id firstName")
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          error: `Not able to fetch orders for this user ${
            req.profile?._id + " " + req.profile?.firstName
          }`,
        });
      }

      return res.status(200).json(orders);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];

  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.count,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //update the purchases in the db
  User.findOneAndUpdate(
    {
      _id: req.profile._id,
    },
    { $push: { purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save Purchases!",
        });
      }
      next();
    }
  );
};
