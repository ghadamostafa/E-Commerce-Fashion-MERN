const products = require("./store/productsRoutes");
const users = require("./admin/usersRoutes");
const auth = require("./store/authRoutes");
const tags = require("./store/tagsRoutes");
const categories = require("./store/categoriesRoutes");
const home = require("./store/homeRoutes");
const filters = require("./store/filtersRoutes");
const adminProducts = require("./admin/productsRoutes.admin");
const adminCategories = require("./admin/categotiesRoutes.admin");
const adminTags = require("./admin/tagsRoutes.admin");

module.exports = {
  products,
  tags,
  categories,
  users,
  home,
  auth,
  filters,
  adminProducts,
  adminCategories,
  adminTags,
};
