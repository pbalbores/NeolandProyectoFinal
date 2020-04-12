
//Importaciones
const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//EXPRESS VALIDATOR SE IMPORTA DE UNA FORMA ESPECIAL
const { check } = require('express-validator');
const jsonWebToken = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');
//const users_controller = require('./controllers/users_controller');
const usersController = require('./controllers/usuarios.controller');


//Creamos servidor
const server = express();

//Midelwares
server.use(helmet());
server.use(bodyParser.json());
/*server.use(bodyParser.urlencoded({
    extended: true
}));*/

//Creamos servidor estático
server.use(express.static('static'))

//ENDPOINTS

/*server.get("/", (req, res) => {
    res.send("Felicidades. El servidor está funcionando. De momento no peta. ¡Muy bien!");
});*/

//1. USUARIOS.POST ==NUEVO USUARIO--POST
server.post('/novoUsuario', [
    check('nombreUsuario').isString().escape().trim(),
    check('password').isString().escape().trim(),
    check('email').isString().escape().trim()]
    , usersController.nuevoUsuario)

//2. USUARIOS.GET ==DEVUELVE TODOS LOS USUARIOS--GET ALL
server.get('/allusers', usersController.listaUsuarios)

//3. USUARIOS.GET ==DEVUELVE UN SOLO USUARIO--GET DETAIL
server.get('/user/:nombreUsuario', usersController.getUsuarioByName)

//4. USUARIOS.PUT ==CAMBIA LOS DATOS DE UN USUARIO --PUT

server.put('/modificarUsuario', [
    check('nombreUsuario').isString().escape().trim(),
    check('password').isString().escape().trim(),
    check('email').isString().escape().trim(),
    check('admin').isNumeric().escape().trim()]
    , usersController.modificarUsuario)

//5. USUARIOS DELETE ==BORRA UN USUARIO
server.delete('/deleteuser/:nombreUsuario', usersController.borrarUsuario);

//Definimos puerto de servidor
const PORT = process.env.PORT
//const PORT = 3000;
//Para arrancar servidor== SET PORT=3000 && nodemon main.js

//Ponemos servidor a escuchar
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
