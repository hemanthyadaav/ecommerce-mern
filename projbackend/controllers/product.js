const product = require("../models/product");
const Product = require("../models/product");
var _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

exports.createProduct = (req, res) => {
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;

  // form.parse(req, (error, fields) => {
  //   console.log("BACKEND", req.body);
  //   if (error) {
  //     console.log("BACKEND", error);
  //     return res.status(400).json({
  //       error: "Problem with Image",
  //     });
  //   }

  console.log("createProduct called ", req.body);

  const { name, description, price, category, stock, photo } = req.body;

  if (!name || !description || !price || !category || !stock || !photo) {
    return res.status(400).json({
      error: "All Fields are compulsory !",
    });
  }

  const product = new Product(req.body);

  // let product = new Product(fields);

  // // handle file here
  // if (file.photo) {
  //   if (file.photo.size > 3 * 1024 * 1024) {
  //     return res.status(400).json({
  //       error: "File size too big!",
  //     });
  //   } else {
  //     // console.log(file.photo.filepath)
  //     product.photo.data = fs.readFileSync(file.photo.filepath);
  //     product.photo.contentType = file.photo.type;
  //   }
  // }

  product.save((error, product) => {
    if (error) {
      return res.status(400).json({
        error: "Saving T-Shirt in DB failed!",
      });
    }
    return res.json(product);
  });
};

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error || !product) {
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
  console.log("updateProduct backend called");
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;

  console.log("PRODUCT BACKEND ", req.body);
  // form.parse(req, (error, fields, file) => {
  //   if (error) {
  //     return res.status(400).json({
  //       error: "Problem with Image",
  //     });
  //   }

  // const { name, description, price, category, stock, photo } = req.body;

  // update product
  // const product = req.product;
  console.log(req.product);

  Product.findOneAndUpdate(
    req.product._id,
    req.body,
    (error, updatedProduct) => {
      if (error) {
        return res.status(400).json({
          error: "Updating T-Shirt in DB failed!",
        });
      }
      return res.json(updatedProduct);
    }
  );

  console.log("Product updated successfully");
};

// product = _.extend(product, req.body);

// handle file here
// if (file.photo) {
//   if (file.photo.size > 3 * 1024 * 1024) {
//     return res.status(400).json({
//       error: "File size too big!",
//     });
//   } else {
//     // console.log(file.photo.filepath)
//     product.photo.data = fs.readFileSync(file.photo.filepath);
//     product.photo.contentType = file.photo.type;
//   }
// }

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((error, deletedProduct) => {
    if (error) {
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
    .exec((error, allProducts) => {
      if (error) {
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

  Product.bulkWrite(bulkOperations, {}, (error, bulkOperations) => {
    if (error) {
      return res.status(400).json({
        error: "Bulk Write Failed!",
      });
    }
    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (error, distinctCategories) => {
    if (error) {
      return res.status(400).json({
        error: "Unable to get all Categories!",
      });
    }
    return res.json(distinctCategories);
  });
};
