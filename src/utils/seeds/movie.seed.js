const mongoose = require('mongoose');
const db = require('../database/database');
const Movie = require('../../api/movies/movies.model');

const initialMovies = [
    {
        title: 'The Matrix',
        director: 'Hermanas Wachowski',
        year: 1999,
        genre: 'Acción',
      },
      {
        title: 'The Matrix Reloaded',
        director: 'Hermanas Wachowski',
        year: 2003,
        genre: 'Acción',
      },
      {
        title: 'Buscando a Nemo',
        director: 'Andrew Stanton',
        year: 2003,
        genre: 'Animación',
      },
      {
        title: 'Buscando a Dory',
        director: 'Andrew Stanton',
        year: 2016,
        genre: 'Animación',
      },
      {
        title: 'Interestelar',
        director: 'Christopher Nolan',
        year: 2014,
        genre: 'Ciencia ficción',
      },
      {
        title: '50 primeras citas',
        director: 'Peter Segal',
        year: 2004,
        genre: 'Comedia romántica',
      },
];

mongoose
    .connect(db.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allMovies = await Movie.find();

        if(allMovies.length) {
            console.log('Removing movies collection...');
            await Movie.collection.drop();
        } else {
            console.log("There's no movies in database... adding movies")
        }
    })
    .catch(error => console.log('Error removing collection from database', error))
    .then(async () => {
        await Movie.insertMany(initialMovies);
        console.log('Movies added successfully...');
    })
    .catch(error => console.log('Error adding movies to database', error))
    .finally(() => mongoose.disconnect());