const router = require('express').Router();
const listController = require('../controllers/list');
const verifyToken = require('../middleware/isAuth');

// Create
router.post('/', verifyToken, listController.postList);

// Delete
router.delete('/:id', verifyToken, listController.deleteList);

// Get all lists
router.get('/', verifyToken, listController.getLists);

module.exports = router;