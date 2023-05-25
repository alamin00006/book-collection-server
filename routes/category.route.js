const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route("/:id")
  .get(categoryController.getCategoryDetails)
  .patch(categoryController.updateCategory);

module.exports = router;
