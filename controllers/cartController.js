const Cart = require("../models/cartModel");
const Product = require("../models/productModels");

exports.createCart = async(req,res) =>{
    const {user_id} = req.user
    const {product_id, quantity} = req.body
    let cart = await Cart.findOne({user_id})

    if(!cart){
        cart = new Cart({
            user_id,
            products:[
                {
                    product_id,
                    quantity,
                },
            ],
        });
    }else{
        const ProductIndex = cart.products.findIndex((prod) => prod.product_id === product_id);
        if (ProductIndex === -1) {
            cart.products.push({ product_id, quantity });
        } else {
            cart.products[ProductIndex].quantity = quantity;
        }
        
}
    cart.save();
    res.status(200).json({message: "Product added/updated in cart", cart});
    
};

exports.getCart = async(req, res) => {
    const { user_id } = req.user;

    try {
        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        let subTotal = 0;
        const CartItems = await Promise.all(
            cart.products.map(async (product) => {
                const productdetails = await Product.findOne({ id: product.product_id });

                if (!productdetails) {
                    return res.status(404).json({ message: `Product with ID ${product.product_id} not found` });
                }

                subTotal += Number(productdetails.price) * Number(product.quantity);
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

        res.status(200).json({ CartItems, subTotal });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.deleteCart = async(req,res) =>{
    const{user_id} = req.user;
    const product_id = req.params.id;
    try{
        if(!user_id){
            res.status(200).json({message: "User Not Found"});
        }
    const cart = await Cart.findOne({user_id});

    const isProductValid = cart.products.find((pro) => product_id == pro.product_id);

    if(!isProductValid){
        return res.status(200).json({message: "Product not found in cart"});
    }

    if(cart.products.length == 1){
        await Cart.deleteOne({user_id});
        return res.status(200).json({message: "Product is removed from the cart"})
    }

    if(!cart){
        res.status(200).json({message: "Cart is not found!"});
    }

    cart.products =cart.products.filter((prod)=> prod.product_id != product_id);
    await cart.save();
    return res.status(401).json({message:"Cart deleted successfully"});
    }catch(err){
        console.log(err);
    }
};