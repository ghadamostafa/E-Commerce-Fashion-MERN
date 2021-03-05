
const express = require('express');
const router = express.Router();
const Product = require('../../models/product')
const Category = require('../../models/category');
const Tag = require('../../models/tag')

//get all products
router.get('/', async (request, response, next) => {
    try {
        const {products,productsCount,pagesCount} = await filterProducts(request.query)

        if (products.length === 0) {
            response.status(404)
            throw new Error('NO products yet!')
        }
        else {
            return response.status(200).json({ success: true,
                 data: products ,productsCount,pagesCount});
        }
    } catch (error) {
        next(error);
    }
});

//show product
router.get('/:slug', async (request, response, next) => {
    try {
        const product = await Product.findOne({ slug: request.params.slug })
            .populate('category').populate('tags')
        if (!product) {
            response.status(404);
            throw new Error('product not found')
        }
        else {
            RelatedProducts = await Product.find({ category: product.category._id }).limit(10)
            return response.status(200).json({ success: true, data: product, RelatedProducts });
        }
    }
    catch (error) {
        next(error)
    }
});

//filter data
async function filterProducts(queryParams) {
    const pageSize=2
    const page=parseInt(queryParams.page) || 1
    // console.log(queryParams.page);
    const skip=(page-1)*pageSize
    const { category, tag } = queryParams;
    let match = {}
    if (category)
        match.category = await Category.findOne({ slug: category }, { _id: 1 })
    if (tag)
        match.tags = await Tag.findOne({ slug: tag }, { _id: 1 })
    const productsCount=await Product.find(match).count();
    const pagesCount=Math.ceil(productsCount/pageSize);
    console.log('pages count',pagesCount);
    const products = await Product.find(match)
        .skip(skip)
        .limit(pageSize)
    return {products,productsCount,pagesCount}
}

module.exports = router;