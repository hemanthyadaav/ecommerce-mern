const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error) {
        return res.status(400).json({
          error: "No orders found in DB!",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save((error, orderInDB) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to save order in DB!",
      });
    }

    return res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id firstName email")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: "No Orders found in DB!",
        });
      }

      return res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path("status").enumValues);
};
exports.updateStatus = (req, res) => {
  Order.updateOne(
    {
      _id: req.body.orderId,
    },
    {
      $set: {
        status: req.body.status,
      },
    },
    (error, order) => {
      if (error) {
        return res.status(400).json({
          error: "Not able to update Order!",
        });
      }
      return res.json(order);
    }
  );
};
