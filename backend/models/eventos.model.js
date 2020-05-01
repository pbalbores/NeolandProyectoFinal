//Importaciones
const connection = require('./db.model');

//1.EVENTOS.POST ==CREAR NUEVO EVENTO----------------------------------------------------------------------------

exports.crearEvento = (nombreEvento, location1, fk_concellos, localizacion2, fecha_in, fecha_fin, hora, artista, descripcion, prezo, imagen, fk_clasificacion, fk_usuario, publicacion) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(
                ` INSERT INTO eventos(nombreEvento, location1, fk_concellos, localizacion2,fecha_in,fecha_fin,hora,artista,descripcion,prezo,imagen,fk_clasificacion,fk_usuario,publicacion)
                VALUES("${nombreEvento}", "${location1}", ${fk_concellos}, "${localizacion2}", "${fecha_in}","${fecha_fin}", "${hora}", "${artista}", "${descripcion}", "${prezo}", "${imagen}", ${fk_clasificacion}, ${fk_usuario}, ${publicacion})`
            )
            resolve(result)
        } catch (error) {
            console.log(error);
            reject(error);

        }
    })
}


//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS---------------------------------------------------------------------

exports.obtenerTodosEventos = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todosEventos = await connection.query("SELECT * FROM eventos e, concellos c, categorias s WHERE e.fk_concellos=c.id && e.fk_clasificacion=s.id")
            resolve(todosEventos);
        } catch (error) {
            reject(error);
        }
    })

}
//3.EVENTOS.GET ==DEVUELVE UN EVENTO-----------------------------------------------------------------------------

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

//4.EVENTOS.PUT ==CAMBIA LOS DATOS DE UN EVENTO------------------------------------------------------------------

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

//5. EVENTOS.DELETE ==BORRA UN EVENTO----------------------------------------------------------------------------
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

//6. FILTRA EVENTOS--------------------------------------------------------------------------------------
exports.filtrarEventos = ({ nombreEvento = null, fk_concellos = null, fecha_in = null, fecha_fin = fecha_in, artista = null, fk_clasificacion = null }) => {
    return new Promise(async (resolve, reject) => {
        let sql = 'SELECT * FROM `eventos` WHERE 1=1 ';

        if (nombreEvento != null) {
            sql += ` AND nombreEvento="${nombreEvento}"`
        } if (fk_concellos != null) {
            sql += ` AND fk_concellos=${fk_concellos}`
        } if (fecha_in != null) {
            sql += ` AND fecha_in="${fecha_in}"`
        } if (fecha_fin != null) {
            sql += ` AND fecha_fin="${nombreEvento}"`
        } if (artista != null) {
            sql += ` AND artista="${artista}"`
        } if (fk_clasificacion != null) {
            sql += ` AND fk_clasificacion="${fk_clasificacion}"`
        }
        try {
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

//7. DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL O SUPERIOR A HOY
exports.obtenerTodosEventosAct = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todosEventosAct = await connection.query("SELECT * FROM eventos e, concellos c, categorias s WHERE e.fk_concellos=c.id && e.fk_clasificacion=s.id && e.fecha_in >= DATE(NOW())")
            resolve(todosEventosAct);
        } catch (error) {
            reject(error);
        }
    })

}

//8. DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL A HOY
exports.obtenerTodosEventosToday = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todosEventosToday = await connection.query("SELECT * FROM eventos e, concellos c, categorias s WHERE e.fk_concellos=c.id && e.fk_clasificacion=s.id && e.fecha_in = DATE(NOW())")
            resolve(todosEventosToday);
        } catch (error) {
            reject(error);
        }
    })

}

