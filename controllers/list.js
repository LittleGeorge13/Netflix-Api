const List = require('../models/List');

exports.postList = async (req, res, next) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);

        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(500).json('You are not allowed!');
    }
}

exports.deleteList = async (req, res, next) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json('List deleted successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(500).json('You are not allowed!');
    }
}

exports.getLists = async (req, res, next) => {
    const typeQuery = req.query.type || "";
    const genreQuery = req.query.genre || "";
    let list = [];
    try {
        if (typeQuery && !genreQuery) {
            list = await List.aggregate([
                { $sample: { size :10 } },
                { $match: { type: typeQuery } }
            ]);
        } else if (!typeQuery && genreQuery) {
            list = await List.aggregate([
                { $sample: { size :10 } },
                { $match: { genre: genreQuery } }
            ]);
        } else if (typeQuery && genreQuery) {
            list = await List.aggregate([
                { $sample: { size :10 } },
                { $match: { type: typeQuery, genre: genreQuery } }
            ]);
        } else {
            list = await List.aggregate([ { $sample: {size :10} } ]);
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
}