const express = require('express');
const router  = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.get('/showcart',auth,cartController.getCart);
router.post('/newcart',auth,cartController.createCart);
router.delete('/deletecart/:id',auth,cartController.deleteCart);

module.exports = router;
