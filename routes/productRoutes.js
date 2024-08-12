const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/productController');
const auth = require("../middlewares/auth")

router.get("/", auth , ProductController.getProducts);
router.post("/", ProductController.createProducts);

module.exports = router;
