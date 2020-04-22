
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
const concellosController = require('./controllers/concellos.controller');
const categoriasController = require('./controllers/categorias.controller');

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
    res.send("Parabéns. Servidor funcionando. De momento non peta. Moi bien!");
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

//6. USUARIOS LOGIN ==PRUEBA QUE EL USUARIO Y LA CONTRASEÑA COINCIDEN ------------------------------------------
server.post('/users/login', [
    check('nombreUsuario').isString().escape().trim(),
    check('password').isString().escape().trim()], usersController.usersLogin);

//7. RECUPERAR CONTRASEÑA ==COMPROBAMOS QUE USUARIO Y EMAIL COINCIDEN--------------------------------------------
server.post('/users/recovery', [
    check('nombreUsuario').isString().escape().trim(),
    check('email').isEmail().escape().trim(),
], usersController.usersPasswordRecover);


//-----------------##-TABLA EVENTOS-##---------------------------------------------------------------------------

//1.EVENTOS.POST ==CREAR NUEVO EVENTO----------------------------------------------------------------------------
server.post('/eventos/new', [
    check('nombreEvento').not().isEmpty().isString().escape().trim(),
    check('location1').optional().isString().escape().trim(),
    check('fk_concellos').not().isEmpty().isNumeric().escape().trim(),
    check('localizacion2').optional().isString().escape().trim(),
    check('fecha_in').not().isEmpty().isString().escape().trim(),
    check('fecha_fin').optional().isString().escape().trim(),
    check('hora').optional().isString().escape().trim(),
    check('artista').not().isEmpty().isString().escape().trim(),
    check('descripcion').optional().isString().escape().trim(),
    check('prezo').optional().isString().escape().trim(),
    check('imagen').optional().isString().escape().trim(),
    check('fk_clasificacion').not().isEmpty().isNumeric().escape().trim(),
    check('fk_usuario').not().isEmpty().isNumeric().escape().trim(),
    check('publicacion').optional().isNumeric().escape().trim()
], eventosController.crearEvento);

//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS---------------------------------------------------------------------
server.get('/eventos/all', eventosController.listaEventos);

//3.EVENTOS.GET ==DEVUELVE UN EVENTO-----------------------------------------------------------------------------
server.get('/eventos/:id', eventosController.eventById);

//4.EVENTOS.PUT ==CAMBIA LOS DATOS DE UN EVENTO------------------------------------------------------------------
//Sin implementar la valñidación del Body
server.put('/eventos/change', [check('nombreEvento').not().isEmpty().isString().escape().trim(),
check('location1').optional().isString().escape().trim(),
check('fk_concellos').not().isEmpty().isNumeric().escape().trim(),
check('localizacion2').optional().isString().escape().trim(),
check('fecha_in').not().isEmpty().isString().escape().trim(),
check('fecha_fin').optional().isString().escape().trim(),
check('hora').optional().isString().escape().trim(),
check('artista').not().isEmpty().isString().escape().trim(),
check('descripcion').optional().isString().escape().trim(),
check('prezo').optional().isString().escape().trim(),
check('imagen').optional().isString().escape().trim(),
check('fk_clasificacion').not().isEmpty().isNumeric().escape().trim(),
check('fk_usuario').not().isEmpty().isNumeric().escape().trim(),
check('publicacion').optional().isNumeric().escape().trim()
], eventosController.modificarEvento);

//5. EVENTOS.DELETE ==BORRA UN EVENTO----------------------------------------------------------------------------
server.delete('/eventos/delete/:idEvento', eventosController.borrarEvento);

//6. EVENTOS PUT FILTRADOS

server.put('/eventos/filtrar', eventosController.filtrarEventos);


//-----------------##-TABLA CONCELLOS-##------------------------------------------------------------------------

//1. DEVUELVE TODOS LOS CONCELLOS
server.get('/concellos/all', concellosController.listaConcellos);

//2. DEVUELVE UN CONCELLO POR ID
server.get('/concellos/:id', concellosController.getConcelloById);
//-----------------##-TABLA CATEGORÍAS-##---------------------------------------------------------------------

//1.DEVUELVE TODAS LAS CATEGORÍAS
server.get('/categorias/all', categoriasController.listaCategorias);

//2. DEVUELVE UN CONCELLO POR ID
server.get('/categorias/:id', categoriasController.getCategoriaById);

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
