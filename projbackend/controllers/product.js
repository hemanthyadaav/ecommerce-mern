const product = require("../models/product");
const Product = require("../models/product");
var _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
      });
    }

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "All Fields are compulsory!",
      });
    }

    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(400).json({
          error: "File size too big!",
        });
      } else {
        // console.log(file.photo.filepath)
        product.photo.data = fs.readFileSync(file.photo.filepath);
        product.photo.contentType = file.photo.type;
      }
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving T-Shirt in DB failed!",
        });
      }
      res.json(product);
    });
  });
};

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Not able to find product in DB!",
        });
      }
      req.product = product;
      next();
    });
};

exports.getProduct = (req, res) => {
  // doing photo as undefined so that we can fire photo through middleware in background, for performance optimization
  req.product.photo = undefined;
  return res.json(req.product);
};

// middlewares
exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
      });
    }

    // update product
    let product = req.product;
    product = _.extend(product, req.body);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(400).json({
          error: "File size too big!",
        });
      } else {
        // console.log(file.photo.filepath)
        product.photo.data = fs.readFileSync(file.photo.filepath);
        product.photo.contentType = file.photo.type;
      }
    }

    product.save((err, updatedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Updating T-Shirt in DB failed!",
        });
      }
      res.json(updatedProduct);
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to delete the product!",
      });
    }
    return res.json({
      message: "Product deleted successfully!",
      deletedProduct,
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let sortType = req.query.sortType ? req.query.sortType : "asc";
  Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy, sortType]])
    .exec((err, allProducts) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to get products from DB!",
        });
      }
      return res.json(allProducts);
    });
};

exports.updateInventory = (req, res, next) => {
  let bulkOperations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: {
          _id: product._id,
        },
        update: {
          $inc: {
            stock: -product.count,
            sold: +product.count,
          },
        },
      },
    };
  });

  Product.bulkWrite(bulkOperations, {}, (err, bulkOperations) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk Write Failed!",
      });
    }

    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, distinctCategories) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to get all Categories!",
      });
    }
    return res.json(distinctCategories);
  });
};