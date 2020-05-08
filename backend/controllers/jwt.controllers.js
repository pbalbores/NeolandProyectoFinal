//Middleware que me comprueba las cookies y los tokens


//Importamos librerias
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');


exports.checkToken = (req, res, next) => {
    if (
        //LLAMADAS AL SERVIDOR PARA LAS CUALES NO HACE FALTA ESTAR IDENTIFICADO---------------------------
        req.path === '/users/login'
        || req.path === '/users/new'
        || req.path === '/eventos/all'
        || req.path === '/eventos/filtrar'
        || req.path === '/eventos/all/active'
        || req.path === '/eventos/all/today'
        || req.path === '/categorias/all'
        || req.path === '/concellos/all'
        || req.path === '/eventos/:id'
    ) {
        //SI NUESTRA LLAMADA SE ENCUENTRA ENTRE ALGUNA DE LAS ANTERIORES DAMOS ACCESO
        next()
    } else {
        //  console.log(req.headers["user-token"])
        //SI NUESTRA LLAMADA NO ES ENCUENTRA ENTRE ALGUNA DE LAS ANTERIORES COMPROBAMOS QUE TENGA TOKEN
        if (req.headers["user-token"] !== undefined) {
            //PASO 0
            //  console.log(`Comprobamos el valor recuperado de Headers: ${req.headers["user-token"]}`)
            //SI EL USUARIO TIENE DATOS DE TOKEN
            const userToken = req.headers["user-token"];
            //PASO 1
            // console.log(`Comprobamos userwebToken en paso 1:${userToken} /// ${secrets.jwt_clave}`)
            jwt.verify(userToken,
                secrets.jwt_clave,
                (error, confirmation) => {
                    if (error) {
                        //PASO 3
                        //  console.log(`Error en paso 3 TOKEN ${userToken}, clave ${secrets.jwt_clave}`)
                        res.status(401).send({ "error": "Token mal formado. El token existe pero está mal formado" })

                    } else if (
                        //Si el token está bien permitimos el acceso
                        confirmation
                    ) {
                        next()
                    } else {
                        res.status(401).send({ "error": "Token non válido. CL2" })
                    }
                })
        } else {
            //SI EL USUARIO NO TIENE DATOS DE TOKEN
            //LE MANDAMOS QUE SE LOGUEE
            res.status(401).send({ "error": "Usuario non autorizado", "loginURL": "Hai que logearse. El usuario no tiene Token" })
        }
    }

}










/*
exports.checkToken = (req, res, next) => {//1
    //Definimos los endpoints sobre los que no queremos que se haga ningún tipo de comprobación del token
    if (req.path === '/users/login'
        || req.path === '/users/new'
        || req.path === '/eventos/all'
        || req.path === '/eventos/filtrar'
        || req.path === '/eventos/all/active'
        || req.path === '/eventos/all/today'
        || req.path === '/categorias/all'
        || req.path === '/concellos/all'
        || req.path === '/eventos/new'
    ) {
        //2
        //Si el endpoint de la llamada coincide con alguno de los anteriores no tienes que estar logueado para acceder
        next()
    }//2
    else {//3
        //Compruebamos que el usuario tiene la cookie de sesión
        //if (req.cookies["stamp"] !== undefined)
        if (req.headers["user-token"]) {//4
            //Si el usuario tiene la cookie comprobamos que es correcta
            //jwt.verify(req.cookies["stamp"],
            const userToken = req.headers["user-token"];
            jwt.verify(userToken,
                secrets.jwt_clave)
        }
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

        }//6 Llave cierre función
    }//4
}  /*else {//5
        //Si el usuario no tiene la cookie lo amndamos a que se logueé
        res.status(401).send({ "error": "Usuario non autorizado", "loginURL": "Hai que logearse" })
    }//5
}//3
}//1*/

