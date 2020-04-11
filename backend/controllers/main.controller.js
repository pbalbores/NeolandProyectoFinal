const usuariosModel = require('../models/usuarios.model');

exports.nuevoUsuario = async (req, res) => {

    const nombre = req.body.nombreUsuario;
    const password = req.body.password;
    const email = req.body.email;
    //El usuario siempre se crea por defecto en 0 (no administrador)
    const admin = 0;
    //LLAMAMOS AL MODELO PARA CREAR UN NUEVO USUARIO
    try {

        //VALIDADORES

        const result = await usuariosModel.crearUsuario(nombre, password, email, admin)
        res.send({ "message": "Usuario creado. Agora podes enviarnos información de eventos.", "ID": result.insertId, })

    } catch (error) {
        console.log(error);
        res.send(error);
    }


}