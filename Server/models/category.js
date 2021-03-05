const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');


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
    slug: { type: String, slug: "name" ,unique:true},
    products: [{ type: mongoose.Schema.ObjectId, ref: 'product' }],
    subCategories: [{
        type: schema.Types.ObjectId,
        ref: 'category'
    }],

});
//add slug to categories schema
categorySchema.plugin(slug);

module.exports = Product = mongoose.model('category', categorySchema);
