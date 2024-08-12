const express = require('express');
const router  = express.Router();
const OrderRouter = require('../controllers/OrderController');
const auth = require('../middlewares/auth');

router.post('/createorder',auth,OrderRouter.createOrder);
router.get('/getorder',auth,OrderRouter.getOrder);

module.exports = router;