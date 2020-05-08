//Importaciones
const connection = require('./db.model');

//1.EVENTOS.POST ==CREAR NUEVO EVENTO---------------------------------------------------------------------

exports.crearEvento = (nombreEvento, location1, fk_concellos, localizacion2, fecha_in, fecha_fin, hora, artista, descripcion, prezo, imagen, fk_clasificacion, fk_usuario, publicacion) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(
                ` INSERT INTO eventos(nombreEvento, location1, fk_concellos, localizacion2,fecha_in,fecha_fin,hora,artista,descripcion,prezo,imagen,fk_clasificacion,fk_usuario,publicacion)
                VALUES("${nombreEvento}", "${location1}", ${fk_concellos}, "${localizacion2}", "${fecha_in}","${fecha_fin}", "${hora}", "${artista}", "${descripcion}", "${prezo}", "${imagen}", ${fk_clasificacion}, ${fk_usuario}, ${publicacion})`
            )
            resolve(result)
        } catch (error) {
            // console.log(error);
            reject(error);

        }
    })
}


//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS FILTRANDO POR CATEGORIAS Y POR CONCELLOS---------------------

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
//3.EVENTOS.GET ==DEVUELVE UN EVENTO----------------------------------------------------------------------

exports.getEventById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const eventData = await connection.query(

                // SELECT * FROM eventos WHERE id= ${id}
                ` SELECT e.id, e.nombreEvento, e.location1, e.fk_concellos, e.localizacion2, e.fecha_in, e.fecha_fin, e.hora, e.artista, e.descripcion, e.prezo, e.imagen, e.fk_clasificacion, e.fk_usuario, e.publicacion, e.destacado, c.concello, s.categoria FROM eventos e, concellos c, categorias s WHERE e.id = ${id} && e.fk_concellos=c.id && e.fk_clasificacion=s.id
            `)
            resolve(eventData)
        } catch (error) {
            // console.log(error)
            reject.send(error)
        }
    })
}

//4.EVENTOS.PUT ==CAMBIA LOS DATOS DE UN EVENTO-----------------------------------------------------------

exports.modificarEvento = (id, nuevoNombreEvento, nuevoLocation1, nuevoFkConcellos, nuevoLocalizacion2, nuevoFechaIn, nuevoFechaFin, nuevoHora, nuevoArtista, nuevoDescripcion, nuevoPrezo, nuevoImagen, nuevoFkClasificacion, nuevoFkUsuario, nuevoPublicacion, nuevoDestacado) => {
    return new Promise(async (resolve, reject) => {
        try {
            //  console.log("Llamada realizada en EventosModel")
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
            publicacion  = "${nuevoPublicacion}",
           destacado="${nuevoDestacado}"
            WHERE id = ${id}
      `
            const result = await connection.query(sql);
            resolve(result)

        } catch (error) {
            //  console.log(error)
            reject(error)
        }
    })
}

//5. EVENTOS.DELETE ==BORRA UN EVENTO--------------------------------------------------------------------
exports.borrarEvento = (idEvento) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM eventos WHERE id="${idEvento}"`;
            const result = await connection.query(sql);
            resolve(result)
        } catch (error) {
            //  console.log(error)
            reject(error)
        }
    })
}

//6. FILTRA EVENTOS--------------------------------------------------------------------------------------
exports.filtrarEventos = ({ id = null, nombreEvento = null, fk_concellos = null, fecha_in = null, fecha_fin = fecha_in, artista = null, fk_clasificacion = null, publicacion = null, destacado = null }) => {
    return new Promise(async (resolve, reject) => {

        let sql = 'SELECT  e.id, e.nombreEvento,e.location1,e.fk_concellos,e.localizacion2,e.fecha_in,e.fecha_fin,e.hora,e.artista,e.descripcion,e.prezo,e.imagen, e.publicacion,e.destacado,e.fk_clasificacion,e.fk_usuario,c.concello,s.categoria FROM eventos e,  concellos c, categorias s WHERE 1=1';
        if (id != null) {
            sql += ` && e.id="${id}" `
        }
        if (nombreEvento != null) {
            sql += ` && nombreEvento="${nombreEvento}" `
        } if (fk_concellos != null) {
            sql += ` && fk_concellos=${fk_concellos} `
        } if (fecha_in != null) {
            sql += ` && fecha_in="${fecha_in}" `
        } if (fecha_fin != null) {
            sql += ` && fecha_fin="${nombreEvento}" `
        } if (artista != null) {
            sql += ` && artista="${artista}" `
        } if (fk_clasificacion != null || fk_clasificacion != undefined) {
            sql += ` && fk_clasificacion="${fk_clasificacion}" `
        } if (publicacion != null || publicacion != undefined) {
            sql += ` && publicacion=${publicacion} `
        } if (destacado != null || destacado != undefined) {
            sql += ` && destacado=${destacado} `
        } if (sql != null) {
            sql += `&& e.fk_concellos=c.id && e.fk_clasificacion=s.id && e.fecha_in >= DATE(NOW())`
        }
        try {
            const result = await connection.query(sql);
            resolve(result)
            //  console.log(`Respuesta recibida desde la bbdd. EventosModel ${JSON.stringify(result)}`)
        } catch (error) {
            //   console.log(error)
            reject(error)
        }
    })

}

//7. DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL O SUPERIOR A HOY------------------------------------------
exports.obtenerTodosEventosAct = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todosEventosAct = await connection.query("SELECT  e.id, e.nombreEvento,e.location1,e.fk_concellos,e.localizacion2,e.fecha_in,e.fecha_fin,e.hora,e.artista,e.descripcion,e.prezo,e.imagen, e.publicacion,e.destacado,e.fk_clasificacion,e.fk_usuario,c.concello,s.categoria FROM eventos e, concellos c, categorias s WHERE e.fk_concellos=c.id && e.fk_clasificacion=s.id && e.fecha_in >= DATE(NOW())")

            resolve(todosEventosAct);
        } catch (error) {
            reject(error);
        }
    })

}

//8. DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL A HOY------------------------------------------------------
exports.obtenerTodosEventosToday = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const todosEventosToday = await connection.query("SELECT  e.id, e.nombreEvento,e.location1,e.fk_concellos,e.localizacion2,e.fecha_in,e.fecha_fin,e.hora,e.artista,e.descripcion,e.prezo,e.imagen, e.publicacion,e.destacado,e.fk_clasificacion,e.fk_usuario,c.concello,s.categoria FROM eventos e, concellos c, categorias s WHERE e.fk_concellos=c.id && e.fk_clasificacion=s.id && e.fecha_in = DATE(NOW())")
            resolve(todosEventosToday);
        } catch (error) {
            reject(error);
        }
    })

}

