const usuariosModel = require('../models/usuarios.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const moment = require('moments');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');


//1. USUARIOS.POST ==NUEVO USUARIO--POST------------------------------------------------------------------

exports.nuevoUsuario = async (req, res) => {

    //LLAMAMOS AL MODELO PARA CREAR UN NUEVO USUARIO

    try {
        const errors = validationResult(req);
        //console.log(errors)
        if (errors.isEmpty()) {

            //SACAMOS DEL BODY LA INFORMACIÓN
            const nombre = req.body.nombreUsuario;
            const email = req.body.email;

            //El usuario siempre se crea por defecto en 0 (no administrador)
            const admin = 0;

            //Obtenemos la contraseña y la hasheamos
            const hash = await bcrypt.hash(req.body.password, 14);
            const result = await usuariosModel.crearUsuario(nombre, hash, email, admin)

            //INSERTAMOS LA INFORMACIÓN
            res.send({ "message": "Usuario creado. Agora podes enviarnos información de eventos.", "ID": result.insertId, })
        } else {
            //console.log(errors)
            res.status(400).send({ "message": "O body está mal formado" })
        }
    } catch (error) {
        //console.log(error);
        res.send(error);
    }
}

//2. USUARIOS.GET ==DEVUELVE TODOS LOS USUARIOS--GET ALL-------------------------------------------------
exports.listaUsuarios = async (req, res) => {
    try {
        const resultados = await usuariosModel.obtenerTodosUsuarios();
        //console.log(resultados);
        res.send(resultados)

    } catch (error) {
        // console.log(error);
        res.send(error)

    }
}

//3. USUARIOS.GET ==DEVUELVE UN SOLO USUARIO POR ID--GET DETAIL-------------------------------------------
exports.getUsuarioById = async (req, res) => {
    try {
        //Sacar del Path param el nombre del usuario
        const userId = req.params.id;
        //Pedir al modelo que saque los datos del producto
        const userData = await usuariosModel.getUserById(userId);
        //SI LO QUE NOS DEVUELVE LA BASE DE DATOS TIENE UN LONGITUD IGUAL A CERO ES QUE EL USUARIO NO EXISTE. ESO ES LO QUE LE RESPONDEMOS AL USUARIO
        if (userData.length === 0) {
            res.status(400).send({ "message": "Ese usuario non existe uc3" })
        } else {
            res.send(userData)
        }
    } catch (error) {
        // console.log(error)
        res.send(error)
    }
}

//4. USUARIOS.PUT ==CAMBIA LOS DATOS DE UN USUARIO --PUT------------------------------------------------

exports.modificarUsuario = async (req, res) => {
    /* try {
         const errors = validationResult(req);
         console.log(`Errores de validación del Body ${errors.array}`)
         if (errors.isEmpty()) {
             const datos = req.body; {
                 const datosFiltrados = await usuariosModel.modificarUsuario(datos)
                 res.send(datosFiltrados)
                 console.log(`Respuesta recibida desde EventosModel. EventosController ${JSON.stringify(datosFiltrados)}`)
                 if (datosFiltrados.isEmpty) {
                     res.send({ "error": "Non existen eventos para eses criterios de busca. Proba con outros" })
                 } else {
                     res.send(datosFiltrados)
                 }
             }
         }
     } catch (error) {
         res.send(error)
     }*/
    const errors = validationResult(req)//Ejecuta las validaciones
    if (errors.isEmpty()) {
        const nombreUsuario = req.body.nombreUsuario;
        const hash = await bcrypt.hash(req.body.password, 14);
        //const password = req.body.password;
        const email = req.body.email;
        const admin = req.body.admin;
        const id = req.body.id;

        //Llamamos al modelo
        try {
            const result = await usuariosModel.modificarUsuario(id, nombreUsuario, hash, email, admin);
            if (result.affectedRows > 0) {
                res.send({ "message": "Datos de usuario modificados con éxito" })
            } else {
                res.status(404).send({ "error": "Ese Id non existe uc4" })
            }
        }
        catch (error) {
            // console.log(error)
            res.send(error);
        }
    } else {
        res.status(400).send({ "error": "O body está mal formado", "explicación": errors })
    }
}

//5. USUARIOS DELETE ==BORRA UN USUARIO----------------------------------------------------------------
exports.borrarUsuario = async (req, res) => {
    //Cogemos de los path params el nombreUsuario
    const nombreUsuario = req.params.nombreUsuario;
    //Pedimos que el modelo elimine ese usuario
    try {
        const results = await usuariosModel.borrarUsuario(nombreUsuario)
        //Comprobar que el usuario exista
        if (results.affectedRows > 0) {
            //Enviar confirmación al cliente
            res.send({ "message": `O usuario con nome ${nombreUsuario} foi eliminado` })
        } else {
            res.status(404).send({ "error": "Ese usuario non existe uc5" })
        }

    } catch (error) {
        res.send(error)
    }
}

//6. USUARIOS LOGIN-----------------------------------------------------------------------------------
exports.usersLogin = async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors)
    if (errors.isEmpty()) {
        const userName = req.body.nombreUsuario;
        const password = req.body.password;

        try {
            const usuario = await usuariosModel.getUserByName(userName);
            for (let i = 0; i < usuario.length; i++) {
                const match = await bcrypt.compare(password, usuario[i].password);
                //Aquí va el json webtoken
                if (match === true) {
                    //Saco el Id del usuario y si es administrador o no del usuario que hizo match.
                    //Se pasan los datos del Id del usuario y si es administardor o no para crear el token
                    usuarioId = usuario[i].id;
                    usuarioAdmin = usuario[i].admin;
                    //Aquí va el json webtoken
                    jwt.sign({ "userId": usuarioId, "administrador": usuarioAdmin },
                        secrets.jwt_clave,
                        //Pongo la clave que yo quiera. La tengo guardada en el archivo SECRETS
                        (error, token) => {
                            if (error) {
                                // console.log(error.json);
                                res.send(error)
                            } else {
                                //   console.log(`Datos de nombre de usuario: ${usuarioId}, Datos de Admin:${usuarioAdmin}`)
                                res.cookie("stamp", token);
                                res.send({
                                    "message": "Ok, o teu contrasinal é correcto. Estás autorizado",
                                    "id": usuarioId,
                                    "admin": usuarioAdmin,
                                    "token": token

                                })
                            }

                        }
                        //Función que se ejcuta cuando haya terminado de generar el Token
                    )

                } else if (i == usuario.length - 1) {
                    //   console.log(i)
                    res.status(400).send({ "Error": "O contrasinal non é correcto. Volve a intentalo" })
                }
            }

        } catch (error) {
            //  console.log(error);
            res.send(error);
        }
    } else {
        res.send({ "message": "Dedes incluír un Usuario e un Contrasinal" })
    }
}

//7. RECUPERAR CONTRASEÑA. COMPROBAMOS QUE USUARIO Y EMAIL COINCIDEN---------------------------------
exports.usersPasswordRecover = async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors)
    if (errors.isEmpty()) {
        const userName = req.body.nombreUsuario;
        const email = req.body.email;

        try {

            const usuario = await usuariosModel.getUserByName(userName);

            for (let i = 0; i < usuario.length; i++) {

                if (email === usuario[i].email) {

                    res.send({ "message": "Ok, introduce un novo contrasinal" })
                } else if (i == usuario.length - 1) {
                    //   console.log(i)
                    res.status(400).send({ "Error": "O Email e o usuario non coinciden. Téntao de novo" })
                }
            }

        } catch (error) {
            //  console.log(error);
            res.send(error);
        }
    } else {
        res.send({ "message": "Dedes incluír un Usuario e un EMail" })
    }
}

//8. USUARIOS.GET ==DEVUELVE UN SOLO USUARIO FILTRANDO POR NOMBRE-GET DETAIL------------------------------------
exports.getUsuarioByName = async (req, res) => {
    try {
        //Sacar del Path param el nombre del usuario
        const userName = req.params.nombreUsuario;


        //Pedir al modelo que saque los datos del producto
        const userDatabyName = await usuariosModel.getUserByName(userName);
        //SI LO QUE NOS DEVUELVE LA BASE DE DATOS TIENE UN LONGITUD IGUAL A CERO ES QUE EL USUARIO NO EXISTE. ESO ES LO QUE LE RESPONDEMOS AL USUARIO
        if (userDatabyName.length === 0) {

            res.status(400).send({ "message": "Ese usuario non existe. uc8" })
        } else {
            res.send(userDatabyName)
        }
    } catch (error) {
        //  console.log(error)
        res.send(error)
    }
}

//9.USUARIOS DELETE == BORRA USUARIO POR ID

exports.borrarUsuarioPorID = async (req, res) => {
    //Cogemos de los path params el nombreUsuario
    const id = req.params.id;
    //Pedimos que el modelo elimine ese usuario
    try {
        const results = await usuariosModel.borrarUsuarioPorId(id)
        //Comprobar que el usuario exista
        if (results.affectedRows > 0) {
            //Enviar confirmación al cliente
            res.send({ "message": `O usuario con ID ${id} foi eliminado` })
        } else {
            res.status(404).send({ "error": "Ese usuario non existe uc5" })
        }

    } catch (error) {
        res.send(error)
    }
}