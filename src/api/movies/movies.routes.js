const express = require('express');
const upload = require('../../utils/middlewares/uploadFile.middleware');
const { getAllMovies, getMovieById, getMovieByTitle, getMoviesByGenre, getMoviesByYear, postMovie, putMovie, deleteMovie } = require('./movies.controller');

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.get('/title/:title', getMovieByTitle);
router.get('/genre/:genre', getMoviesByGenre);
router.get('/year/:year', getMoviesByYear);
router.post('/new', upload.single('photo'), postMovie);
router.put('/edit/:id', upload.single('photo'), putMovie);
router.delete('/delete/:id', deleteMovie);

module.exports = router;