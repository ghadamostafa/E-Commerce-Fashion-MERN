const mongoose = require('mongoose');
const schema = mongoose.Schema;
const urlSlugs = require('mongoose-url-slugs');
var Float = require('mongoose-float').loadType(mongoose);
const tag=require('./Tag');
const category=require('./Category');

const productSchema = new schema({
    name: {
        type: String,
        required: true,
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
    in_stock: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    photo:{
        type:Buffer,
        contentType:String
    },
    tags:
        [ {type : mongoose.Schema.ObjectId, ref : 'tag'} ],
    categories:
        [ {type : mongoose.Schema.ObjectId, ref : 'category'} ]
    

})
productSchema.plugin(urlSlugs('name', { field: 'slug' }));

module.exports = Product = mongoose.model('product', productSchema);
