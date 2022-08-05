const Cinema = require('./cinemas.model');

const getAllCinemas = async (req, res, next) => {
    try {
        const allCinemas = await Cinema.find().populate('movies');
        return res.status(200).json(allCinemas);
    } catch (error) {
        return next(error);
    }
};

const postCinema = async (req, res, next) => {
    try {
        const newCinema = new Cinema(req.body);
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema)
    } catch (error) {
        return next(error);
    }
};

const putCinema = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cinema = new Cinema(req.body);
        cinema._id = id; // cambiamos el id al nuevo objeto para actualizar el que genera por el suyo
        const updatedCinema = await Cinema.findByIdAndUpdate(id, cinema);
        return res.status(200).json(updatedCinema);
    } catch (error) {
       return next(error);
    }
};

const deleteCinema = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCinema = await Movie.findByIdAndDelete(id);
        return res.status(200).json(deletedCinema);
    } catch (error) {
        return next(error);
    }
};



module.exports = { getAllCinemas, postCinema, putCinema, deleteCinema };