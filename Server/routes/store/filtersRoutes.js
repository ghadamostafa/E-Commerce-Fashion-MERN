const express = require('express');
const router = express.Router();
const Category = require('../../models/category')
const Tag = require('../../models/tag')

router.get('/', async (request, response, next) => {
  try {
    const categories = await Category.find({ subCategories: { $ne: [] } }).populate('subCategories');
    const tags = await Tag.find({});
    return response.status(200).json({ success: true, data: { categories, tags } });
  }
  catch (error) {
    next(error)
  }
})

module.exports = router;