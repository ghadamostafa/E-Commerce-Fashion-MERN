const express = require('express');
const { Error } = require('mongoose');
const router = express.Router();
const Category = require('../../models/category')

//@get all categories ... /admin/categories
router.get('/', async (request, response, next) => {
    try {
        const categories = await Category.find({})
        if (categories.length === 0) {
            response.status(404)
            throw new Error('NO categories yet!');
        }
        else {
            response.status(200).json({ success: true, data: categories });
            next();
        }
    } catch (error) {

        next(error)
    }
});

// @delete category ... /admin/categories/:slug 
router.delete('/:slug', async (request, response, next) => {
    try {
        const category = await Category.findOneAndDelete({ slug: request.params.slug }, {
            returnOriginal: false
        })
        if (!category) {
            response.status(404)
            throw new Error('Category not found');
        }
        else {
            response.json({ success: true, data: category })
            next()
        }
    } catch (error) {
        next(error)
    }
});


//@store category ... /admin/categories
router.post('/', async (request, response, next) => {
    try {
        const category = new Category(request.body);
        await category.save();
        response.status(201).json({ success: true, data: category });
        next();
    }
    catch (error) {
        next(error);
    }
});

//@update category ... /admin/categories/:slug
router.put('/:slug',async (request, response, next) => {
    try {
        const category = await Category.findOneAndUpdate({ slug: request.params.slug }, request.body, {
            returnOriginal: false
        });
        if (!category) {
            response.status(404)
            throw new Error('category not found')
        }
        else {
            response.status(200).json({ success: true, data: category })
            next()
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;
