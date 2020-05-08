const concellosModel = require('../models/concellos.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

//1. GET ALL--OBTENEMOS DATOS DE TODOS LOS CONCELLOS------------------------------------------------------

exports.listaConcellos = async (req, res) => {
    try {
        const resultados = await concellosModel.obtenerTodosConcellos();
        //console.log(resultados);
        res.send(resultados)

    } catch (error) {
        console.log(error);
        res.send(error)

    }
}

//2. GET BY ID. DEVUELVE DATOS DE CONCELLO POR ID---------------------------------------------------------
exports.getConcelloById = async (req, res) => {
    try {
        //Sacar del Path param el nombre del usuario
        const id = req.params.id;
        //Pedir al modelo que saque los datos del producto
        const concelloData = await concellosModel.getConcelloById(id);
        //SI LO QUE NOS DEVUELVE LA BASE DE DATOS TIENE UN LONGITUD IGUAL A CERO ES QUE EL USUARIO NO EXISTE. ESO ES LO QUE LE RESPONDEMOS AL USUARIO
        if (concelloData.length === 0) {
            res.status(400).send({ "message": "Ese concello non existe" })
        } else {
            res.send(concelloData)
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}