//Inicamos proyecto.
//Importamos Express
const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const jsonWebToken = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const mongooseAutopopulate = require('mongoose-autopopulate');











//Creamos servidor
const server = express();

//Midelwares
server.use(helmet());

//Creamos servidor estático
server.use(express.static('static'))

//Llamadas
server.get("/", (req, res) => {
    res.send("Felicidades. El servidor está funcionando. De momento no peta. ¡Muy bien!");
});



//Definimos puerto de servidor
//const PORT = process.env.PORT;
const PORT = 3000;

//Ponemos servidor a escuchar
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
