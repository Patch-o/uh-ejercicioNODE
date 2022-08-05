const express = require('express');
const { getAllCinemas, postCinema, putCinema, deleteCinema } = require('./cinemas.controller');

const router = express.Router();

router.get('/', getAllCinemas );
router.post('/new', postCinema);
router.put('/edit/:id', putCinema);
router.delete('/delete/:id', deleteCinema);

module.exports = router;