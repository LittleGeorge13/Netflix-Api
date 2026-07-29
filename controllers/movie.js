const Movie = require('../models/Movie');

exports.postMovie = async (req, res, next) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(500).json('You are not allowed!');
    }
}

exports.putMovie = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { returnDocument: 'after' }
            );
            res.status(200).json(savedMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(500).json('You are not allowed!');
    }
}

exports.deleteMovie = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json('Movie deleted successfully!');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(500).json('You are not allowed!');
    }
}

exports.getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getRandomMovie = async (req, res, next) => {
    const type = req.query.type || 'movie';
    let movie;
    try {
        if (type === 'series') {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ]);
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getMovies = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You are not allowed!');
    }
}