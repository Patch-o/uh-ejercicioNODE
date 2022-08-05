const { deleteFile } = require('../../utils/middlewares/deleteFile.middleware');
const Movie = require('./movies.model');

const getAllMovies = async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        return res.status(200).json(allMovies);
    } catch (error) {
        return next(error);
    }
};

const getMovieById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (movie) {
            return res.status(200).json(movie);
        } else {
            return res.status(404).json('Movie not found with this id');
        }
    } catch (error) {
        return next(error);
    }
};

const getMovieByTitle = async (req, res, next) => {
    try {
        const { title } = req.params;
        const movie = await Movie.find({title: title});
        if (movie.length) {
            return res.status(200).json(movie);
        } else {
            return res.status(404).json('Movie not found with this title');
        }
    } catch (error) {
        return next(error);
    }
};

const getMoviesByGenre = async (req, res, next) => {
    try {
        const { genre } = req.params;
        const movie = await Movie.find({genre: genre});
        if (movie.length) {
            return res.status(200).json(movie);
        } else {
            return res.status(404).json('Movie not found with this genre');
        }
    } catch (error) {
        return next(error);
    }
};

const getMoviesByYear = async (req, res, next) => {
    try {
        const { year } = req.params;
        const movies = await Movie.find({year: {$gte: year}});
        if (movies.length) {
            return res.status(200).json(movies);
        } else {
            return res.status(404).json('Movie not found with this year');
        }
    } catch (error) {
        return next(error);
    }
};

const postMovie = async (req, res, next) => {
    try {
        const newMovie = new Movie(req.body);
        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie);
    } catch (error) {
        return next(error);
    }
};

const putMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = new Movie(req.body);
        movie._id = id; // cambiamos el id al nuevo objeto para actualizar el que genera por el suyo
        if(req.file) {
            movie.photo = req.file.path;
        }
        const updatedMovie = await Movie.findByIdAndUpdate(id, movie);
        if(updatedMovie.photo) {
            deleteFile(updatedMovie.photo)
        }
        return res.status(200).json(updatedMovie);
    } catch (error) {
       return next(error);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        return res.status(200).json(deletedMovie);
    } catch (error) {
        return next(error);
    }
};

module.exports = { getAllMovies, getMovieById, getMovieByTitle, getMoviesByGenre, getMoviesByYear, postMovie, putMovie, deleteMovie };