const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const Float = require('mongoose-float').loadType(mongoose);
const tag=require('./tag');
const Category=require('./category');
const uniqueValidator = require('mongoose-unique-validator');



const productSchema = new schema({
    name: {
        type: String,
        required: true,
        unique:true,
        minlength: 3,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    price: {
        type: Float,
        required: true,
        min: 0
    },
    inStock: {
        type: Boolean,
        default: true
    },
    photo:{
        type:Buffer,
        contentType:String
    },
    slug: { type: String, slug: "name" ,unique:true},
    tags:
        [ {type : mongoose.Schema.ObjectId, ref : 'tag'} ],
    category:
        {type : mongoose.Schema.ObjectId, ref : 'category'}
    

},{
    timestamps:true
})
productSchema.plugin(slug);
productSchema.plugin(uniqueValidator);


module.exports = Product = mongoose.model('product', productSchema);
