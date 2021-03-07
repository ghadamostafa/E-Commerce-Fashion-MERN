const express = require('express');
const router = express.Router();
const Product = require('../../models/product')
const {auth,isAdmin} =require('../../middlewares/auth')

router.use(auth);
router.use(isAdmin);
//@get all products ... /admin/products
router.get('/', async (request, response, next) => {
    try {
        const products = await Product.find({}).populate('category').populate('tags')
        if (products.length === 0) {
            response.status(404)
            throw new Error('NO products yet!')
        }
        else {
            response.status(200).json({ success: true, data: products });
            next();
        }
    } catch (error) {
        next(error);
    }
});

//@delete product ... /admin/products/:slug
router.delete('/:slug',async (request, response, next) => {
    try {
        const product=await Product.findOneAndDelete({ slug: request.params.slug }, {
            returnOriginal: false
        })
        if (!product) {
            response.status(404)
            throw new Error('product not found')
        }
        else {
            response.status(200).json({ success: true, data: product })
            next()
        }
    } catch (error) {
        next(error)
    }

});

//@store product
router.post('/', async (request, response, next) => {
    try {
        let product = new Product(request.body);
        await product.save();
        const newProduct=await product.populate('category').populate('tags').execPopulate()
        response.status(201).json({ success: true, data: newProduct });
        next();
    }
    catch (error) {
       next(error)
    }
});


//update product 
router.put('/:slug', async(request, response, next) => {
    try {
        const product=await Product.findOneAndUpdate({ slug: request.params.slug }, request.body, {
            returnOriginal: false
        }).populate('tags').populate('category')
        if (!product) {
            response.status(404)
            throw new Error('Product not found')
        }
        else {
            response.status(200).json({ success: true, data: product })
            next();
        }
    } catch (error) {
        next(error)    
    }
});


module.exports = router;