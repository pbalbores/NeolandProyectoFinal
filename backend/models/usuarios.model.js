
//*SE COMUNICA CON LA TABLA USUARIOS DE LA BASE DE DATOS---------------------------------------------------------
//*
const connection = require('./db.model');

//------------------##-CRUD SOBRE TABLA USUARIOS-##--------------------------------------------------------------

//1. INSERT == CREATE NEW USER----POST---------------------------------------------------------------------------

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

//2. GET OBTENER TODOS LOS USUARIOS---GET ALL--------------------------------------------------------------------

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

///3. OBTENER DATOS DE UN USUARIO UTILIZANDO LA ID---GET DETAIL-----------------------------------
exports.getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = await connection.query(`SELECT * FROM usuarios WHERE id= "${userId}"`)
            resolve(userData)
        } catch (error) {
            console.log(error)
            reject.send(error)
        }
    })
}

//4. USUARIOS.PUT ==CAMBIA LOS DATOS DE UN USUARIO --PUT---------------------------------------------------------

exports.modificarUsuario = (id, nuevoNombre, nuevaPassword, nuevoEmail, nuevoAdmin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `
         UPDATE usuarios SET
          nombreUsuario = "${nuevoNombre}",
           password = "${nuevaPassword}",
          email = "${nuevoEmail}",
           admin  = "${nuevoAdmin}"
           WHERE id = ${id}
      `
            const result = await connection.query(sql);
            resolve(result)

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

exports.modificarUsuario2 = ({ id, nombreUsuario = null, password = null, email = null, admin = null }) => {
    return new Promise(async (resolve, reject) => {

        //HAcemos llamada get para obtener datos 
        try {
            const datosUsuarioOld = this.getUserById(id);
            console.log(`*************DATOS USUARIOS OLD****************${datosUsuariosOld}`)

        } catch (error) {
            console.log(error)
        }

        let sql = 'UPDATE usuarios SET ';
        if (nombreUsuario != null) {
            sql += `nombreUsuario="${nombreUsuario}" `
        }
        if (password != null) {
            sql += `,password="${password}" `
        } if (email != null) {
            sql += `,email="${email}" `
        } if (admin != null) {
            sql += ` ,admin="${admin}" `
        } if (id != null) {
            sql += ` WHERE id=${id} `
        } try {
            const result = await connection.query(sql);
            resolve(result)
            console.log(`REspuesta recibida desde la bbdd. EventosModel ${JSON.stringify(result)}`)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })

}

//5. USUARIOS DELETE ==BORRA UN USUARIO--------------------------------------------------------------------------

exports.borrarUsuario = (nombreUsuario) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM usuarios WHERE nombreUsuario="${nombreUsuario}"`;
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

//8. USUARIOS.GET ==DEVUELVE UN SOLO USUARIO FILTRANDO POR NOMBRE-GET DETAIL------------------------------------
exports.getUserByName = (userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDatabyName = await connection.query(`SELECT * FROM usuarios WHERE nombreUsuario= "${userName}"`)
            resolve(userDatabyName)

        } catch (error) {
            console.log(error)
            reject.send(error)
        }
    })
}

//9.USUARIOS DELETE == BORRA USUARIO POR ID
exports.borrarUsuarioPorId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM usuarios WHERE id="${id}"`;
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}