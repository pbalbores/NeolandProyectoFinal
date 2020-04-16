const connection = require('./db.model');

//1.EVENTOS.POST ==CREAR NUEVO EVENTO

exports.crearEvento = (nombreEvento, location1, fk_concellos, localizacion2, fecha, hora, artista, descripcion, prezo, imagen, fk_clasificacion, fk_usuario, publicacion) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(
                ` INSERT INTO eventos(nombreEvento, location1, fk_concellos, localizacion2,fecha,hora,artista,descripcion,prezo,imagen,fk_clasificacion,fk_usuario,publicacion)
                VALUES("${nombreEvento}", "${location1}", ${fk_concellos}, "${localizacion2}", "${fecha}", ${hora}, "${artista}", "${descripcion}", ${prezo}, ${imagen}, ${fk_clasificacion}, ${fk_usuario}, ${publicacion})`
            )
            resolve(result)
        } catch (error) {
            console.log(error);
            reject(error);

        }
    })
}


//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS

exports.obtenerTodosEventos = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todosEventos = await connection.query("SELECT * FROM eventos")
            resolve(todosEventos);
        } catch (error) {
            reject(error);
        }
    })

}
//3.EVENTOS.GET ==DEVUELVE UN EVENTO

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

exports.modificarEvento = (id, nuevoNombreEvento, nuevoLocation1, nuevoFkConcellos, nuevoLocalizacion2, nuevoFechaIn, nuevoFechaFin, nuevoHora, nuevoArtista, nuevoDescripcion, nuevoPrezo, nuevoImagen, nuevoFkClasificacion, nuevoFkUsuario, nuevoPublicacion) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `
            UPDATE eventos SET
            nombreEvento ="${nuevoNombreEvento}", 
            location1 ="${nuevoLocation1}", 
            fk_concellos ="${nuevoFkConcellos}",  
            localizacion2  ="${nuevoLocalizacion2}",
            fecha_in="${nuevoFechaIn}",
            fecha_fin= "${nuevoFechaFin}",
            hora ="${nuevoHora}",
            artista = "${nuevoArtista}",
            descripcion = "${nuevoDescripcion}",
            prezo ="${nuevoPrezo}",
           imagen = "${ nuevoImagen}",
            fk_clasificacion = "${nuevoFkClasificacion}",
           fk_usuario = ${nuevoFkUsuario},
            publicacion  = "${nuevoPublicacion}"
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



//5. EVENTOS.DELETE ==BORRA UN EVENTO
exports.borrarEvento = (idEvento) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM eventos WHERE id="${idEvento}"`;
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}