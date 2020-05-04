
//Importaciones
const eventosModel = require('../models/eventos.model');
const { validationResult } = require('express-validator');

//1.EVENTOS.POST ==CREAR NUEVO EVENTO----------------------------------------------------------------------------
exports.crearEvento = async (req, res) => {

    //LLAMAMOS AL MODELO PARA CREAR UN NUEVO EVENTO

    try {

        const errors = validationResult(req);
        console.log(`Errores de validación del Body ${errors}`)
        if (errors.isEmpty()) {

            //SACAMOS DEL BODY LA INFORMACIÓN

            const nombreEvento = req.body.nombreEvento;
            const location1 = req.body.location1;
            const fk_concellos = req.body.fk_concellos;
            const localizacion2 = req.body.localizacion2;
            const fecha_in = req.body.fecha_in;
            const fecha_fin = req.body.fecha_fin;
            const hora = req.body.hora;
            const artista = req.body.artista;
            const descripcion = req.body.descripcion;
            const prezo = req.body.prezo;
            const imagen = req.body.imagen;
            const fk_clasificacion = req.body.fk_clasificacion;
            const fk_usuario = req.body.fk_usuario;
            //Publicacion siempre será 1 hasta que un administrador lo cambie a 0 para que aparezca publicado
            const publicacion = 1;

            const result = await eventosModel.crearEvento(nombreEvento, location1, fk_concellos, localizacion2, fecha_in, fecha_fin, hora, artista, descripcion, prezo, imagen, fk_clasificacion, fk_usuario, publicacion)

            //INSERTAMOS LA INFORMACIÓN
            res.send({ "message": "Evento creado. Debe ser aprobado pola Administración da páxina para que poida ser visíbel.", "ID": result.insertId, })
        } else {
            console.log(errors.array())
            res.status(400).send(`Error producido por Validation results ${errors}`)
        }
    } catch (error) {
        console.log(`Error en el catch de Controller ${error}`);
        res.send(`Error producido en la Base de Datos: ${error}`);
    }


}

//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS---------------------------------------------------------------------

exports.listaEventos = async (req, res) => {
    try {
        const resultados = await eventosModel.obtenerTodosEventos();
        //console.log(resultados);
        res.send(resultados)

    } catch (error) {
        console.log(error);
        res.send(error)

    }
}

//3.EVENTOS.GET ==DEVUELVE UN EVENTO-----------------------------------------------------------------------------
exports.eventById = async (req, res) => {
    try {
        //Sacar del Path param el id del evento
        const eventId = req.params.id;
        //Pedir al modelo que saque los datos del evento
        const eventData = await eventosModel.getEventById(eventId);
        //SI LO QUE NOS DEVUELVE LA BASE DE DATOS TIENE UN LONGITUD IGUAL A CERO ES QUE EL EVENTO NO EXISTE. ESO ES LO QUE LE RESPONDEMOS AL USUARIO
        if (eventData.length === 0) {
            res.status(400).send({ "message": "Evento non atopado" })
        } else {
            res.send(eventData)
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
//4.EVENTOS.PUT ==CAMBIA LOS DATOS DE UN EVENTO------------------------------------------------------------------

exports.modificarEvento = async (req, res) => {
    const errors = validationResult(req)//Ejecuta las validaciones
    if (errors.isEmpty()
    ) {
        const id = req.body.id;
        const nuevoNombreEvento = req.body.nombreEvento;
        const nuevoLocation1 = req.body.location1;
        const nuevoFkConcellos = req.body.fk_concellos;
        const nuevoLocalizacion2 = req.body.localizacion2;
        const nuevoFechaIn = req.body.fecha_in;
        const nuevoFechaFin = req.body.fecha_fin;
        const nuevoHora = req.body.hora;
        const nuevoArtista = req.body.artista;
        const nuevoDescripcion = req.body.descripcion;
        const nuevoPrezo = req.body.prezo;
        const nuevoImagen = req.body.imagen;
        const nuevoFkClasificacion = req.body.fk_clasificacion;
        const nuevoFkUsuario = req.body.fk_usuario;
        const nuevoPublicacion = req.body.publicacion;

        //Llamamos al modelo
        try {
            const result = await eventosModel.modificarEvento(id, nuevoNombreEvento, nuevoLocation1, nuevoFkConcellos, nuevoLocalizacion2, nuevoFechaIn, nuevoFechaFin, nuevoHora, nuevoArtista, nuevoDescripcion, nuevoPrezo, nuevoImagen, nuevoFkClasificacion, nuevoFkUsuario, nuevoPublicacion);
            if (result.affectedRows > 0) {
                res.send({ "message": "Datos de evento modificados con éxito" })
            } else {
                res.status(404).send({ "error": "Ese evento non existe" })
            }
        }
        catch (error) {
            console.log(error)
            res.send(error);
        }
    } else {
        res.status(400).send({ "error": "O body está mal formado", "explicación": errors })
    }
}

//5. EVENTOS.DELETE ==BORRA UN EVENTO----------------------------------------------------------------------------
exports.borrarEvento = async (req, res) => {
    //Cogemos de los path params el nombreUsuario
    const idEvento = req.params.idEvento;
    //Pedimos que el modelo elimine ese usuario
    try {
        const results = await eventosModel.borrarEvento(idEvento)
        //Comprobar que el usuario exista
        if (results.affectedRows > 0) {
            //Enviar confirmación al cliente
            res.send({ "message": `O evento con ID ${idEvento} foi eliminado` })
        } else {
            res.status(404).send({ "error": "Ese evento non existe" })
        }

    } catch (error) {
        res.send(error)
    }
}

//6. FILTRA EVENTOS-----------------------------------------------------------------------------------------
exports.filtrarEventos = async (req, res) => {

    try {
        const errors = validationResult(req);
        console.log(`Errores de validación del Body ${errors.array}`)
        if (errors.isEmpty()) {
            const datos = req.body; {
                const datosFiltrados = await eventosModel.filtrarEventos(datos)
                res.send(datosFiltrados)
                console.log(`Respuesta recibida desde EventosModel. EventosController ${JSON.stringify(datosFiltrados)}`)
                if (datosFiltrados.isEmpty) {
                    res.send({ "error": "Non existen eventos para eses criterios de busca. Proba con outros" })
                } else {
                    res.send(datosFiltrados)
                }
            }
        }
    } catch (error) {
        res.send(error)
    }
}

//7. DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL O SUPERIOR A HOY
exports.listaEventosAct = async (req, res) => {
    try {
        const resultados = await eventosModel.obtenerTodosEventosAct();
        //console.log(resultados);
        res.send(resultados)

    } catch (error) {
        console.log(`Error en eventos.controller ${error}`);
        res.send(error)

    }
}

//8. DEVUELVE TODOS LOS EVENTOS CON FECHA IGUAL  A HOY
exports.listaEventosToday = async (req, res) => {
    try {
        const resultados = await eventosModel.obtenerTodosEventosToday();
        //console.log(resultados);
        res.send(resultados)

    } catch (error) {
        console.log(`Error en eventos.controller ${error}`);
        res.send(error)

    }
}
