const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require('uuid');
const Product = require("../models/productModels");

exports.createOrder = async (req, res) => {
    try {
        const { name, UserEmail, Address, phoneNumber } = req.body;
        const { user_id } = req.user;

        const user_cart = await Cart.findOne({ user_id });

        if (!user_cart) {
            return res.status(500).json({ message: "Cart Not found" });
        }

        const product_cart = user_cart.products;

        console.log("Username:", name);
        console.log("Email:", UserEmail);
        console.log("Products in Cart:", product_cart);

        const order = new Order({
            order_id: uuidv4(),  
            user_id,
            name,  
            Address,
            phoneNumber,
            ProductsList: product_cart,  
            UserEmail
        });

        console.log("Order Data before Save:", order);

        await order.save();  
        await Cart.findOneAndDelete({ user_id }); 

        res.status(200).json({ message: "Ordered Successfully" });
    } catch (error) {
        console.error("Error during order creation:", error);
        res.status(500).json({ message: "Error creating order" });
    }
};

exports.getOrder = async(req,res) => {
    const {user_id} = req.user;
    try{
        const order = await Order.findOne({user_id});
        if(!order){
            return res.status(404).json({message:"Order Not Found"});
        }
        let totalAmount = 0;
        const totalOrders = await Promise.all(
            order.ProductsList.map(async (product) => {
                const productdetails = await Product.findOne({id: product.product_id});

                if(!productdetails) return res.status(404).json({message:"Product Not found"});
                totalAmount+= productdetails.price * product.quantity;

                return {
                    product_id: productdetails.id,
                    title: productdetails.title,
                    description: productdetails.description,
                    price: productdetails.price,
                    image: productdetails.image,
                    quantity: product.quantity,
                };
            })
        );

        res.status(200).json({totalOrders,totalAmount});
    } catch(error){
        res.status(500).json({ message : "server Error",error: error.message});
    }
};


