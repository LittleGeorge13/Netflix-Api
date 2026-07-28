const router = require('express').Router();
const User = require('../models/User');
const userController = require('../controllers/user');
const verifyToken = require('../middleware/isAuth');

// Update
router.put('/:id', verifyToken, userController.putUser);

// Delete
router.delete('/:id', verifyToken, userController.deleteUser);

// Get
router.get('/find/:id', userController.getUserById);

// Get all
router.get('/find', verifyToken, userController.getUsers);

// Get user stats
router.get('/stats', userController.getStats);

module.exports = router;