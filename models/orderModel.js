const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' //from config.js 
        },
        items: [{
            productName: String,
            productPrice: Number,
            productQuantity: Number
        }],

        name: {
            firstName: String, 
            lastName: String
        },
        
        billingInfo: {
            billAddress: String,
            billPhone: Number,
            billZip: Number,
            billCity: String,
            billState: String
        },

        paymentInfo: { 
            cardNumber: Number,
            cardExpiry: String,
            cardCVV: Number
        },

        orderTotal: Number,

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;