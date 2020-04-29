//Middleware que me comprueba las cookies y los tokens


//Importamos librerias
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');



exports.checkToken = (req, res, next) => {//1
    //Definimos los endpoints sobre los que no queremos que se haga ningún tipo de comprobación del token
    if (req.path === '/users/login' || req.path === '/users/new' || req.path === '/eventos/all' || req.path === '/eventos/filtrar' || req.path === '/eventos/all/active' || req.path === '/eventos/all/today') {//2
        //Si el endpoint de la llamada coincide con alguno de los anteriores no tienes que estar logueado para acceder
        next()
    }//2
    else {//3
        //Compruebamos que el usuario tiene la cookie de sesión
        if (req.cookies["stamp"] !== undefined) {//4
            //Si el usuario tiene la cookie comprobamos que es correcta
            jwt.verify(req.cookies["stamp"],
                secrets.jwt_clave,
                (error, confirmacion) => { //6-Llave apertura función
                    if (error) {//7
                        //Si la cookie no está bien formada
                        res.status(401).send({ "error": "Token non válido. CL1" })
                    }//7
                    else if (//Si la cookie está bien comprobamos que es válida
                        confirmacion) {//8
                        next()
                    }//8
                    else {//9 
                        console.log(confirmacion)
                        console.log(req.cookies["stamp"])
                        res.status(401).send({ "error": "Token non válido. CL2" })
                    }//9

                })//6 Llave cierre función
        }//4
        else {//5
            //Si el usuario no tiene la cookie lo amndamos a que se logueé
            res.status(401).send({ "error": "Usuario non autorizado", "loginURL": "Hai que logearse" })
        }//5
    }//3
}//1


