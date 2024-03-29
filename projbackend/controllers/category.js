const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error || !category) {
      return res.status(400).json({
        error: `No Category found with id ${id}`,
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((error, category) => {
    if (error || !category) {
      return res.status(400).json({
        error: `Not able to save category in DB`,
      });
    }
    return res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error || !categories) {
      return res.json(400).json({
        error: "Not able to get all categories from DB",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((error, updatedCategory) => {
    if (error) {
      return res.status(400).json({
        error: `Failed to update category!`,
      });
    }
    return res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((error, category) => {
    if (error || !category) {
      return res.status(400).json({
        error: `Failed to delete category`,
      });
    }
    return res.json({
      message: `Successfully Deleted category ${category.name}`,
    });
  });
};
