const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const product =require('./product');

const tagSchema = new schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    slug: { type: String, slug: "name" ,unique:true},

    // products: [ {type : mongoose.Schema.ObjectId, ref : 'product'} ]

},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })
//add slug to tags schema
tagSchema.plugin(slug);
// the inverse of the many to many relationship of products
tagSchema.virtual('products',{
    ref: 'product',
    localField:'_id',
    foreignField:'tags'
})

module.exports = Product = mongoose.model('tag', tagSchema);
