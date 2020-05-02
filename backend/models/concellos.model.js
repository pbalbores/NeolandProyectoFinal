//*SE COMUNICA CON LA TABLA USUARIOS DE LA BASE DE DATOS---------------------------------------------------------
//*
const connection = require('./db.model');

//------------------##-CRUD SOBRE TABLA CONCELLOS-##-------------------------------------------------------------

//1. GET ALL--OBTENEMOS NOMBRE DE TODOS LOS CONCELLOS-------------------------------------------------------------
exports.obtenerTodosConcellos = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todosConcellos = await connection.query("SELECT * FROM concellos")
            resolve(todosConcellos);
        } catch (error) {
            reject(error);
        }
    })

}

//2. GET ID. OBTENER CONCELLO POR ID-----------------------------------------------------------------------------
exports.getConcelloById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const concelloData = await connection.query(`SELECT * FROM concellos WHERE id= "${id}"`)
            resolve(concelloData)
        } catch (error) {
            console.log(error)
            reject.send(error)
        }
    })
}
