const usuariosModel = require('../models/usuarios.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


//1. USUARIOS.POST ==NUEVO USUARIO--POST-------------------------------------------------------------------------

exports.nuevoUsuario = async (req, res) => {

    //LLAMAMOS AL MODELO PARA CREAR UN NUEVO USUARIO

    try {
        const errors = validationResult(req);
        console.log(errors)
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
            console.log(errors)
            res.status(400).send({ "message": "O body está mal formado" })
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }


}

//2. USUARIOS.GET ==DEVUELVE TODOS LOS USUARIOS--GET ALL---------------------------------------------------------
exports.listaUsuarios = async (req, res) => {
    try {
        const resultados = await usuariosModel.obtenerTodosUsuarios();
        //console.log(resultados);
        res.send(resultados)

    } catch (error) {
        console.log(error);
        res.send(error)

    }
}

//3. USUARIOS.GET ==DEVUELVE UN SOLO USUARIO--GET DETAIL---------------------------------------------------------
exports.getUsuarioByName = async (req, res) => {
    try {
        //Sacar del Path param el nombre del usuario
        const userName = req.params.nombreUsuario;
        //Pedir al modelo que saque los datos del producto
        const userData = await usuariosModel.getUserByName(userName);
        //SI LO QUE NOS DEVUELVE LA BASE DE DATOS TIENE UN LONGITUD IGUAL A CERO ES QUE EL USUARIO NO EXISTE. ESO ES LO QUE LE RESPONDEMOS AL USUARIO
        if (userData.length === 0) {
            res.status(400).send({ "message": "Ese usuario non existe" })
        } else {
            res.send(userData)
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//4. USUARIOS.PUT ==CAMBIA LOS DATOS DE UN USUARIO --PUT---------------------------------------------------------

exports.modificarUsuario = async (req, res) => {
    const errors = validationResult(req)//Ejecuta las validaciones
    if (errors.isEmpty()) {
        const nombreUsuario = req.body.nombreUsuario;
        const password = req.body.password;
        const email = req.body.email;
        const admin = req.body.admin;
        const id = req.body.id;

        //Llamamos al modelo
        try {
            const result = await usuariosModel.modificarUsuario(id, nombreUsuario, password, email, admin);
            if (result.affectedRows > 0) {
                res.send({ "message": "Datos de usuario modificados con éxito" })
            } else {
                res.status(404).send({ "error": "Ese Id non existe" })
            }
        }
        catch (error) {
            console.log(error)
            res.send(error);
        }
    } else {
        res.status(400).send({ "error": "O body está mal formado", "explicación": errors })
    }
}

//5. USUARIOS DELETE ==BORRA UN USUARIO--------------------------------------------------------------------------
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
            res.status(404).send({ "error": "Ese usuario non existe" })
        }

    } catch (error) {
        res.send(error)
    }
}

//6. USUARIOS LOGIN
exports.usersLogin = async (req, res) => {
    //VALIDAR BODY
    const userName = req.body.nombreUsuario;
    const password = req.body.password;

    try {
        const usuario = await usuariosModel.getUserByName(userName);
        console.log(usuario[0]);
        const match = await bcrypt.compare(password, usuario[0].password);
        if (match === true) {
            res.send({ "message": "Ok, o teu contrasinal é correcto. Estás autorizado" })
        } else {
            res.status(400).send({ "Error": "O contrasinal non é correcto. Volve a intentalo" })
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    }

}