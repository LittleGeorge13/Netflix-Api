const User = require('../models/User');
const CryptoJS = require('crypto-js');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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

exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json('Wrong password or username!');
        }
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_ENCRYPT);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            return res.status(401).json('Wrong password or username!');
        }

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.PASSWORD_ENCRYPT, { expiresIn: '5d' }
        );
        const { password, ...info} = user._doc;
        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        res.status(500).json(err.message);
    }
};