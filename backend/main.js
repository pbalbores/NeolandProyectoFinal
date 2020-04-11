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
const mysql = require('mysql');
//const users_controller = require('./controllers/users_controller');
const mainController = require('./controllers/main.controller');


//Creamos servidor
const server = express();

//Midelwares
server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

//Creamos servidor estático
server.use(express.static('static'))

//ENDPOINTS
server.get("/", (req, res) => {
    res.send("Felicidades. El servidor está funcionando. De momento no peta. ¡Muy bien!");
});
//USUARIOS.POST==NEW USUARIO
server.post('/novoUsuario', mainController.nuevoUsuario)



//Definimos puerto de servidor
const PORT = process.env.PORT
//const PORT = 3000;
//Para arrancar servidor== SET PORT=3000 && nodemon main.js

//Ponemos servidor a escuchar
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
