
//Importaciones--------------------------------------------------------------------------------------------
const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
//Instalar versión 4.0.0 (npm i bcrypt@4.0.0)
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
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
const middlewares = require('./middlewares/middelwares');
const jwtcontrollers = require('./controllers/jwt.controllers');


//Creamos servidor----------------------------------------------------------------------------------------
const server = express();

//Midelwares-------------------------------------------------------------------------------------------------
server.use(helmet());
// Configurar cabeceras y cors
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

//Permite que el FrontEnd realice llamadas POST y PUT------------------------------------------------------
server.use(bodyParser.json());
/*server.use(bodyParser.urlencoded({
    extended: true
}));*/
//Permite realizar llamadas desde Angular-----------------------------------------------------------------
server.use(cookieParser());
//server.use(jwtcontrollers.checkToken);
server.use(cors({
    "origin": "http://localhost:4200"
}));
//server.use(fileUpload());



//Creamos servidor estático----------------------------------------------------------------------------
server.use(express.static('static'))

//***********************************************************************************************************

//-------------**-ENDPOINTS-**-------------------------------------------------------------------------------

//Comprobamos que el servidor funciona--------------------------------------------------------------------
server.get("/test", (req, res) => {
    res.send("Parabéns. Servidor funcionando. De momento non peta. Moi bien!");
});

///-------------------------##-TABLA USUARIOS-##---------------------------------------------------------

//1. USUARIOS.POST ==NUEVO USUARIO--POST-----------------------------------------------------------------
server.post('/users/new', [
    check('nombreUsuario').isString().escape().trim(),
    check('password').isString().escape().trim(),
    check('email').isEmail().escape().trim()]
    , usersController.nuevoUsuario)

//2. USUARIOS.GET ==DEVUELVE TODOS LOS USUARIOS--GET ALL--------------------------------------------------
server.get('/users/all', usersController.listaUsuarios)

//3. USUARIOS.GET ==DEVUELVE UN SOLO USUARIO--GET DETAIL--------------------------------------------------
server.get('/users/:id', usersController.getUsuarioById)

//4. USUARIOS.PUT ==CAMBIA LOS DATOS DE UN USUARIO --PUT--------------------------------------------------

server.put('/users/change', [
    check('nombreUsuario').isString().escape().trim(),
    check('password').isString().escape().trim(),
    check('email').isEmail().escape().trim(),
    check('admin').isNumeric().escape().trim()]
    , usersController.modificarUsuario)

//5. USUARIOS DELETE ==BORRA UN USUARIO--------------------------------------------------------------------
server.delete('/users/delete/:nombreUsuario', usersController.borrarUsuario);

//6. USUARIOS LOGIN ==PRUEBA QUE EL USUARIO Y LA CONTRASEÑA COINCIDEN -----------------------------------
server.post('/users/login', [
    check('nombreUsuario').isString().escape().trim(),
    check('password').isString().escape().trim()], usersController.usersLogin);

//7. RECUPERAR CONTRASEÑA ==COMPROBAMOS QUE USUARIO Y EMAIL COINCIDEN--------------------------------------
server.post('/users/recovery', [
    check('nombreUsuario').isString().escape().trim(),
    check('email').isEmail().escape().trim(),
], usersController.usersPasswordRecover);

//8. USUARIOS.GET ==DEVUELVE UN SOLO USUARIO FILTRANDO POR NOMBRE-GET DETAIL------------------------------
server.get('/users/get/:nombreUsuario', usersController.getUsuarioByName)

//9.USUARIOS DELETE == BORRA USUARIO POR ID
server.delete('/users/delete/user/:id', usersController.borrarUsuarioPorID);


//-----------------##-TABLA EVENTOS-##-----------------------------------------------------------------

//1.EVENTOS.POST ==CREAR NUEVO EVENTO---------------------------------------------------------------------
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
    check('imagen').optional().isString(),//.escape().trim(),
    check('fk_clasificacion').not().isEmpty().isNumeric().escape().trim(),
    check('fk_usuario').not().isEmpty().isNumeric().escape().trim(),
    check('publicacion').optional().isNumeric().escape().trim()
], //middlewares.checkToken, 
    eventosController.crearEvento);

//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS---------------------------------------------------------------
server.get('/eventos/all', eventosController.listaEventos);

//3.EVENTOS.GET ==DEVUELVE UN EVENTO----------------------------------------------------------------------
server.get('/eventos/:id', eventosController.eventById);

//4.EVENTOS.PUT ==CAMBIA LOS DATOS DE UN EVENTO----------------------------------------------------------
//Sin implementar la validación del Body
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
check('imagen').optional().isString().escape(),//.trim(),
check('fk_clasificacion').not().isEmpty().isNumeric().escape().trim(),
check('fk_usuario').not().isEmpty().isNumeric().escape().trim(),
check('publicacion').optional().isNumeric().escape().trim(),
check('destacado').optional().isNumeric().escape().trim()
], eventosController.modificarEvento);

//5. EVENTOS.DELETE ==BORRA UN EVENTO---------------------------------------------------------------------
server.delete('/eventos/delete/:idEvento', eventosController.borrarEvento);

//6. EVENTOS PUT FILTRADOS--------------------------------------------------------------------------------
server.put('/eventos/filtrar', eventosController.filtrarEventos);

//7. DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL O SUPERIOR A HOY------------------------------------------
server.get('/eventos/all/active', eventosController.listaEventosAct);

//8. DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL  A HOY------------------------------------------
server.get('/eventos/all/today', eventosController.listaEventosToday);



//-----------------##-TABLA CONCELLOS-##------------------------------------------------------------------

//1. DEVUELVE TODOS LOS CONCELLOS-------------------------------------------------------------------------
server.get('/concellos/all', concellosController.listaConcellos);

//2. DEVUELVE UN CONCELLO POR ID---------------------------------------------------------------------------
server.get('/concellos/:id', concellosController.getConcelloById);
//-----------------##-TABLA CATEGORÍAS-##-----------------------------------------------------------

//1.DEVUELVE TODAS LAS CATEGORÍAS-------------------------------------------------------------------------
server.get('/categorias/all', categoriasController.listaCategorias);

//2. DEVUELVE UN CONCELLO POR ID--------------------------------------------------------------------------
server.get('/categorias/:id', categoriasController.getCategoriaById);

//******************************************************************************************************* 

//-----------------##-LISTEN-##------------------------------------------------------------------------------

//Definimos puerto de servidor-----------------------------------------------------------------------------
const PORT = process.env.PORT
//const PORT = 3000;
//Para arrancar servidor== SET PORT=3000 && nodemon main.js

//Ponemos servidor a escuchar-----------------------------------------------------------------------------
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
