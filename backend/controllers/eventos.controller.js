const eventosModel = require('../models/eventos.model');
const { validationResult } = require('express-validator');

//1.EVENTOS.POST ==CREAR NUEVO EVENTO
exports.crearEvento = async (req, res) => {

    //LLAMAMOS AL MODELO PARA CREAR UN NUEVO EVENTO

    try {

        const errors = 0
        //validationResult(req);
        console.log(errors)
        if (errors == 0
            //errors.isEmpty()
        ) {

            //SACAMOS DEL BODY LA INFORMACIÓN

            const nombreEvento = req.body.nombreEvento;
            /* if (nombreEvento.length == 0) {
                 res.send({ "message": "O nome de evento debe conter datos" })
             }*/
            const location1 = req.body.location1;
            /*  if (location1.length == 0) {
                  location1 = "non achegado"
              }*/
            const fk_concellos = req.body.fk_concellos;
            /*  if (fk_concellos.length == 0) {
                  res.send({ "message": "O campo 'Concello'  debe conter datos" })
              }*/
            const localizacion2 = req.body.localizacion2;
            const fecha = req.body.fecha;
            /*   if (fecha.length == 0) {
                   res.send({ "message": "O campo 'Data' debe conter datos" })
               }*/
            const hora = req.body.hora;
            const artista = req.body.artista;
            /* if (artista.length == 0) {
                 res.send({ "message": "O campo 'Artista'  debe conter datos" })
             }*/
            const descripcion = req.body.descripcion;
            const prezo = req.body.prezo;
            const imagen = req.body.imagen;
            const fk_clasificacion = req.body.fk_clasificacion;
            /*  if (fk_clasificacion.length == 0) {
                  res.send({ "message": "O campo 'Clasificacion'  debe conter datos" })
              }*/
            const fk_usuario = req.body.fk_usuario;

            //Publicacion siempre será 1 hasta que un administrador lo cambie a 0 para que aparezca publicado
            const publicacion = 1;
            console.log(location1)
            const result = await eventosModel.crearEvento(nombreEvento, location1, fk_concellos, localizacion2, fecha, hora, artista, descripcion, prezo, imagen, fk_clasificacion, fk_usuario, publicacion)

            //VALIDACION2


            //INSERTAMOS LA INFORMACIÓN
            res.send({ "message": "Evento creado. Debe ser aprobado pola Administración da páxina para que poida ser visíbel.", "ID": result.insertId, })
        } else {
            console.log(errors)
            res.status(400).send(`Error producido por Validation results ${error}`)
        }
    } catch (error) {
        console.log(error);
        res.send(`Error producido en la Base de Datos: ${error}`);
    }


}

//2.EVENTOS.GET ==DEVUELVE TODOS LOS EVENTOS

//3.EVENTOS.GET ==DEVUELVE UN EVENTO
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
//4.EVENTOS.PUT ==CAMBIA LOS DATOS DE UN EVENTO

//5. EVENTOS.DELETE ==BORRA UN EVENTO
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