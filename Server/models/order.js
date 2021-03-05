const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose);



const orderSchema = new schema({
    // customer_address:{},
    // customer_phone:{},
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
      paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      },
    user: [ {type : mongoose.Schema.ObjectId, ref : 'user'} ]

},{
  timestamps:true
})

module.exports = Product = mongoose.model('order', orderSchema);
