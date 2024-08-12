const Product = require("../models/productModels");
const { v4: uuidv4 } = require('uuid');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

exports.createProducts = async (req, res) => {
    try {
        const { title, description, price, category, rating, image } = req.body;
        const product = new Product({
            id: uuidv4(),
            title,
            price,
            description,
            category,
            rating,
            image
        });
        await product.save();
        res.status(200).json("Product created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}
