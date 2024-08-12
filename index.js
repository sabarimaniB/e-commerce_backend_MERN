const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const userRoutes = require("./routes/UserRoute");
const products = require("./routes/productRoutes");
const cart = require("./routes/cartRoutes");
const order = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

mongoose.connect("mongodb://localhost:27017/e-commerce")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/products", products);
app.use("/user", userRoutes);
app.use("/cart", cart);
app.use("/order", order);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
