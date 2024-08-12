const mongoose = require('mongoose');

const cartmodel = new mongoose.Schema({
    user_id:String,
    products:[{
        product_id: String,
        quantity: Number,
    },
],
});

const Cart = mongoose.model("cart",cartmodel);
module.exports = Cart;
