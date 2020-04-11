
//*
//*
//***AQUÍ SE GESTIONA LA CONEXIÓN CON LA BASE DE DATOS 
//*
//*

const mysql = require('mysql');
//Importamos configuración de conexión
const secrets = require('../config/secrets');




//WRAPPER PARA USAR PROMESAS
//Se reutiliza. Es simepre igual

class Database {
    constructor(config) {
        this.connection = mysql.createPool(config)
    }
    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, result) => {
                if (error) {
                    console.log(error)
                    return reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })
    }
}


//Creamos una constante con los datos de la conexión
const connection = new Database(secrets);

//Exportamos
module.exports = connection;