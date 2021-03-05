
const express = require('express');
const { Error } = require('mongoose');
const router = express.Router();
const Category = require('../../models/category')


// get all main categories 
router.get('/', async (request, response, next) => {
    try {
        const categories = await Category.find({ subCategories: { $ne: [] } }).populate('subCategories');
        if (categories.length === 0) {
            response.status(404);
            throw new Error('NO categories yet!')
        }
        else {
            return response.status(200).json({ success: true, data: categories });
        }
    } catch (error) {
        next(error)
    }
});

//show category
router.get('/:slug', async (request, response, next) => {
    try {
        const category = await Category.findOne({ slug: request.params.slug });
        if (!category) {
            response.status(404);
            throw new Error('category not found')
        }
        else {
            return response.status(200).json({ success: true, data: category });
        }
    } catch (error) {
        console.log(error);
        next(error)
    }

});


module.exports = router;