
//Importaciones--------------------------------------------------------------------------------------------------
const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
//Instalar versión 4.0.0 (npm i bcrypt@4.0.0)
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//EXPRESS VALIDATOR SE IMPORTA DE UNA FORMA ESPECIAL
const { check } = require('express-validator');
const jsonWebToken = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');

//Importamos Controladores
//const users_controller = require('./controllers/users_controller');
const usersController = require('./controllers/usuarios.controller');
const eventosController = require('./controllers/eventos.controller');

//Creamos servidor-----------------------------------------------------------------------------------------------
const server = express();

//Midelwares-----------------------------------------------------------------------------------------------------
server.use(helmet());
server.use(bodyParser.json());
/*server.use(bodyParser.urlencoded({
    extended: true
}));*/
server.use(cors());

//Creamos servidor estático-------------------------------------------------.------------------------------------
server.use(express.static('static'))

//***********************************************************************************************************

//-------------**-ENDPOINTS-**-----------------------------------------------------------------------------------


//Comprobamos que el servidor funciona---------------------------------------------------------------------------
server.get("/test", (req, res) => {
    res.send("Felicidades. El servidor está funcionando. De momento no peta. ¡Muy bien!");
});


///-------------------------##-TABLA USUARIOS-##-----------------------------------------------------------------

//1. USUARIOS.POST ==NUEVO USUARIO--POST-------------------------------------------------------------------------
server.post('/users/new', [
    check('nombreUsuario').isString().escape().trim(),
    check('password').isString().escape().trim(),
    check('email').isString().escape().trim()]
    , usersController.nuevoUsuario)

//2. USUARIOS.GET ==DEVUELVE TODOS LOS USUARIOS--GET ALL---------------------------------------------------------
server.get('/users/all', usersController.listaUsuarios)

//3. USUARIOS.GET ==DEVUELVE UN SOLO USUARIO--GET DETAIL---------------------------------------------------------
server.get('/users/:nombreUsuario', usersController.getUsuarioByName)

//4. USUARIOS.PUT ==CAMBIA LOS DATOS DE UN USUARIO --PUT---------------------------------------------------------

server.put('/users/change', [
    check('nombreUsuario').isString().escape().trim(),
    check('password').isString().escape().trim(),
    check('email').isEmail().escape().trim(),
    check('admin').isNumeric().escape().trim()]
    , usersController.modificarUsuario)

//5. USUARIOS DELETE ==BORRA UN USUARIO--------------------------------------------------------------------------
server.delete('/users/delete/:nombreUsuario', usersController.borrarUsuario);

//6. USUARIOS LOGIN ==PERMITE QUE EL USUARIO Y LA CONTRASEÑA COINCIDEN ------------------------------------------
server.post('/users/login', usersController.usersLogin);

//-----------------##-TABLA EVENTOS-##---------------------------------------------------------------------------

//1.EVENTOS.POST ==CREAR NUEVO EVENTO----------------------------------------------------------------------------
server.post('/eventos/new', eventosController.crearEvento);
//Sin implementar la validación del Body

//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS---------------------------------------------------------------------
server.get('/eventos/all', eventosController.listaEventos)
//3.EVENTOS.GET ==DEVUELVE UN EVENTO-----------------------------------------------------------------------------
server.get('/eventos/:id', eventosController.eventById)

//4.EVENTOS.PUT ==CAMBIA LOS DATOS DE UN EVENTO------------------------------------------------------------------
//Sin implementar la valñidación del Body
server.put('/eventos/change', eventosController.modificarEvento)

//5. EVENTOS.DELETE ==BORRA UN EVENTO----------------------------------------------------------------------------
server.delete('/eventos/delete/:idEvento', eventosController.borrarEvento);


//-----------------##-TABLA CONCELLOS-##------------------------------------------------------------------------

//1. DEVUELVE UN CONCELLO POR ID
//==IMPLEMENTAR
//-----------------##-TABLA CLASIFICACION-##---------------------------------------------------------------------

//1.DEVUELVE UNA CLASIFICACIÓN POR ID
//==IMPLEMENTAR
//************************************************************************************************************** 

//-----------------##-LISTEN-##----------------------------------------------------------------------------------

//Definimos puerto de servidor-----------------------------------------------------------------------------------
const PORT = process.env.PORT
//const PORT = 3000;
//Para arrancar servidor== SET PORT=3000 && nodemon main.js

//Ponemos servidor a escuchar------------------------------------------------------------------------------------
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
