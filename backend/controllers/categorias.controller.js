const categoriasModel = require('../models/categorias.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

//1. GET ALL--OBTENEMOS DATOS DE TODAS LAS CATEGORÍAS------------------------------------------------------------

exports.listaCategorias = async (req, res) => {
    try {
        const resultados = await categoriasModel.obtenerTodasCategorias();
        //console.log(resultados);
        res.send(resultados)

    } catch (error) {
        console.log(error);
        res.send(error)

    }
}

//2. GET BY ID. DEVUELVE DATOS DE CATEGORÍA POR ID---------------------------------------------------------------
exports.getCategoriaById = async (req, res) => {
    try {
        //Sacar del Path param el nombre del usuario
        const id = req.params.id;
        //Pedir al modelo que saque los datos del producto
        const categoriaData = await categoriasModel.getCategoriaById(id);
        //SI LO QUE NOS DEVUELVE LA BASE DE DATOS TIENE UN LONGITUD IGUAL A CERO ES QUE EL USUARIO NO EXISTE. ESO ES LO QUE LE RESPONDEMOS AL USUARIO
        if (categoriaData.length === 0) {
            res.status(400).send({ "message": "Esa categoría non existe" })
        } else {
            res.send(categoriaData)
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}