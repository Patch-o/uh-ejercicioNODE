const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./src/utils/database/database');
const moviesRoutes = require('./src/api/movies/movies.routes');
const cinemasRoutes = require('./src/api/cinemas/cinemas.routes');
const cloudinary = require("cloudinary").v2;

dotenv.config();
db.connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
  

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // permitimos que nuestro servidor codifique y decodifique en json
app.use(express.urlencoded({ extended: true })); // configuramos que nuestro servidor confirme que el body tiene el content-type correcto
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE"); // permitimos las siguientes operaciones en el servidor
    res.header("Access-Control-Allow-Credentials", "true"); // permitimos que haya credenciales en nuestras peticiones
    res.header("Acces-Control-Allow-Headers", "Content-Type"); // definimos el tipo de cabecera que vamos a permitir
    next();
});

app.use(cors({
    origin: '*', // en un futuro declararemos un array con posibles rutas
    credentials: true
}));


app.use('/movies', moviesRoutes);
app.use('/cinemas', cinemasRoutes);

app.use('*', (req, res, next) => {
    return res.status(404).json('Route not found');
});

app.use((error, req, res) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
});

app.listen(PORT, () => {
    console.log(`Listenning in http://localhost:${PORT}`);
});
