//*
//*
//*SE COMUNICA CON LA TABLA USUARIOS DE LA BASE DE DATOS
//*

const connection = require('./db.model');

//CRUD SOBRE TABLA USUARIOS

//1. INSERT == CREATE NEW USER

exports.crearUsuario = (nombreUsuario, password, email, admin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(
                ` INSERT INTO usuarios(nombreUsuario, password, email, admin)
                VALUES("${nombreUsuario}", "${password}", "${email}", "${admin}")`
            )
            resolve(result)
        } catch (error) {
            console.log(error);
            reject(error);

        }
    })
}

//2. GET OBTENER TODOS LOS USUARIOS

exports.obtenerTodosUsuarios = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todosUsuarios = await connection.query("SELECT * FROM usuarios")
            resolve(todosUsuarios);
        } catch (error) {
            reject(error);
        }
    })

}

//3. OBTENER DATOS DE UN USUARIO UTILIZANDO EL NOMBRE DE USUARIO
exports.getUserByName = (userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = await connection.query(`SELECT * FROM usuarios WHERE nombreUsuario= "${userName}"`)
            resolve(userData)
        } catch (error) {
            console.log(error)
            reject.send(error)
        }
    })
}