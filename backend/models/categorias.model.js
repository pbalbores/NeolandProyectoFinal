//SE COMUNICA CON LA TABLA USUARIOS DE LA BASE DE DATOS--------------------------------------------------------
const connection = require('./db.model');

//------------------##-CRUD SOBRE TABLA CATEGORIAS-##-----------------------------------------------------------

//1. GET ALL--OBTENEMOS DATOS DE TODAS LAS CATEGORIAS------------------------------------------------------------
exports.obtenerTodasCategorias = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todasCategorias = await connection.query("SELECT * FROM categorias")
            resolve(todasCategorias);
        } catch (error) {
            reject(error);
        }
    })

}
//2. GET ID. OBTENER CATEGORIA POR ID----------------------------------------------------------------------------
exports.getCategoriaById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const categoriaData = await connection.query(`SELECT * FROM categorias WHERE id= "${id}"`)
            resolve(categoriaData)
        } catch (error) {
            console.log(error)
            reject.send(error)
        }
    })
}
