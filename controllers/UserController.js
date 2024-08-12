const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({
            username: username,
            email: email,
            password: password
        });
        await user.save();
        res.status(200).json("User created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("Invalid Email or Password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid Email or Password");
        }
        const token = jwt.sign({ user_id: user._id }, "secret token", {
            expiresIn: "5h"
        });
        res.status(200).json(token);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
