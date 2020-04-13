const connection = require('./db.model');

//1.EVENTOS.POST ==CREAR NUEVO EVENTO

//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS

//3.EVENTOS.GET ==DEVUELVE UN EVENTO


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

exports.getEventById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const eventData = await connection.query(`SELECT * FROM eventos WHERE id= ${id}`)
            resolve(eventData)
        } catch (error) {
            console.log(error)
            reject.send(error)
        }
    })
}
//4.EVENTOS.PUT ==CAMBIA LOS DATOS DE UN EVENTO

//5. EVENTOS.DELETE ==BORRA UN EVENTO