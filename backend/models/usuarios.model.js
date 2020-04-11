const connection = require('./db.model');

//CRUD OBRE TABLA USUARIOS

//INSERT == CREATE NEW USER


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

