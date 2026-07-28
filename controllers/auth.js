const User = require("../models/User");
const CryptoJS = require("crypto-js");
require('dotenv').config();

exports.postRegister = async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_ENCRYPT
        ).toString(),
    });

    try {
        const user = await newUser.save();
        res.status(200).json({
            ...newUser._doc
        });
    } catch (err) {
        res.status(500).json(err);
    }
}