const router = require('express').Router();
const movieController = require('../controllers/movie');
const verifyToken = require('../middleware/isAuth');

// Create
router.post('/', verifyToken, movieController.postMovie);

// Update
router.put('/:id', verifyToken, movieController.putMovie);

// Delete
router.delete('/:id', verifyToken, movieController.deleteMovie);

// Get
router.get('/find/:id', verifyToken, movieController.getMovieById);

// Get random movie
router.get('/random', verifyToken, movieController.getRandomMovie);

// Get all movies
router.get('/', verifyToken, movieController.getMovies);

module.exports = router;