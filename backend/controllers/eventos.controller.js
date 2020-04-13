const eventosModel = require('../models/eventos.model');

//1.EVENTOS.POST ==CREAR NUEVO EVENTO

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