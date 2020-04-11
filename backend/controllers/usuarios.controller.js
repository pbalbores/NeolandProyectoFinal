const usuariosModel = require('../models/usuarios.model');


//1. CREAR NUEVO USUARIO

exports.nuevoUsuario = async (req, res) => {
    //SACAMOS DEL BODY LA INFORMACIÓN
    const nombre = req.body.nombreUsuario;
    const password = req.body.password;
    const email = req.body.email;
    //El usuario siempre se crea por defecto en 0 (no administrador)
    const admin = 0;

    //LLAMAMOS AL MODELO PARA CREAR UN NUEVO USUARIO
    try {

        const result = await usuariosModel.crearUsuario(nombre, password, email, admin)

        //INSERTAMOS LA INFORMACIÓN
        res.send({ "message": "Usuario creado. Agora podes enviarnos información de eventos.", "ID": result.insertId, })

    } catch (error) {
        console.log(error);
        res.send(error);
    }


}

//2. OBTENER TODOS LOS USUARIOS
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

//3. OBTENER DATOS DE UN USUARIO UTILIZANDO EL NOMBRE DE USUARIO
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