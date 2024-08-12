const express = require("express");
const router = express.Router();
const UserRoutes = require('../controllers/UserController');
const auth = require("../middlewares/auth");

router.get('/', UserRoutes.getUser);
router.post("/createuser", UserRoutes.createUser);
router.post("/login", UserRoutes.login);

module.exports = router;
