const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose);

const orderSchema = new schema({
    customer_address:{
      type:String,
      required:true
    },
    customer_phone:{
      type:String,
      required:true
    },
    totalPrice: {
        type: Float,
        required: true,
        min: 0
    },
    orderItems: [
        {
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'product',
          },
        },
      ],
    user: [ {type : mongoose.Schema.ObjectId, ref : 'user'} ]

},{
  timestamps:true
})

module.exports = Product = mongoose.model('order', orderSchema);
