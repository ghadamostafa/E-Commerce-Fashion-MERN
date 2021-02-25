const mongoose = require('mongoose');
const schema = mongoose.Schema;
const urlSlugs = require('mongoose-url-slugs');
const product =require('./Product');

const tagSchema = new schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    products: [ {type : mongoose.Schema.ObjectId, ref : 'product'} ]

})
//add slug to tags schema
tagSchema.plugin(urlSlugs('name', { field: 'slug' }));

module.exports = Product = mongoose.model('tag', tagSchema);
