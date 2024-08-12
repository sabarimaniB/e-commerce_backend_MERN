const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    order_id:String,
    user_id:String,
    name: String,
    Address: String,
    phoneNumber: Number,
    ProductsList: [{
        product_id: String,
        quantity: Number
    }],
    OrderDate:{
        type:Date,
        default:Date.now()
    },
    EstimatedDate: {
        type:Date,
        default: Date.now() + 10*24*60*60*1000
    },
    UserEmail: {
        type:String
    }
});
const Orders = mongoose.model('Order', OrderSchema);
module.exports = Orders;
