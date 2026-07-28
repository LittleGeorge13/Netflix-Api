const router = require('express').Router();
const User = require('../models/User');
const authController = require('../controllers/auth');

// Register
router.post('/register', authController.postRegister);

// Login
router.post('/login', authController.postLogin);

module.exports = router;