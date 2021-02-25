const mongoose = require('mongoose');
const schema = mongoose.Schema;
const urlSlugs = require('mongoose-url-slugs');

const categorySchema = new schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    details: {
        type: String,
        required: true,
        minlength: 10,
    },
    products: [{ type: mongoose.Schema.ObjectId, ref: 'product' }],
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],

});
//add slug to categories schema
categorySchema.plugin(urlSlugs('name', { field: 'slug' }));

module.exports = Product = mongoose.model('category', categorySchema);
