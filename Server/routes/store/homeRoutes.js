const express = require("express");
const router = express.Router();
const Product = require("../../models/product");
const Category = require("../../models/category");

//get latest products products
router.get("/products/latest", async (request, response, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    if (products.length === 0) {
      response.statusCode = 404;
      throw new Error("NO products yet!");
    } else {
      return response.status(200).json({ success: true, data: products });
    }
  } catch (error) {
    next(error);
  }
});

//get categories for navbar
router.get("/categories/navbar", async (request, response, next) => {
  try {
    const categories = await Category.find({ subCategories: { $ne: [] } })
      .populate("subCategories")
      .limit(5);
    if (categories.length === 0) {
      response.statusCode = 404;
      throw new Error("NO categories yet!");
    } else {
      return response.status(200).json({ success: true, data: categories });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
