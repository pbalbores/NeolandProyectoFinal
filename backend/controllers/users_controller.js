const express = require('express');
const router = express.Router();
const user = require('../models/users_model');

//INSERTANDO UN NUEVO USUARIO

router.post('/user/', function (req, res, next) {
    user.createNewUser(req.body, function (err, result) {
        //Error

        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                res.send({ error: true, message: "O usuario xa existe" });
            } else {
                res.send({ error: true, message: "Internal Server Error" });
            }
        } else {
            if (result.affectedRows > 0) {
                res.send({ error: false, message: "Usuario creado satisfactoriamente" });
            }
        }
    });
});


//OBTENER TODOS LOS USUARIOS

router.get('/user/', function (req, res, next) {
    user.getAllUsers(function (err, rows, next) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
            console.log(rows);
        }
    });
});

//OBTENER USUARIO POR ID

router.get('/user/:id?', function (req, res, next) {
    if (req.params.id) {
        user.getUserById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        })
    } else {
        res.send({ error: true, message: "Usuario non atopado" });
    }
});

//UPDATE USER BY ID

router.put('/user/:id', function (req, res, next) {
    user.updateUser(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

//DELETE BOOK BY ID
router.delete('user/:id', function (req, res, next) {
    user.deleteUser(req.params.id, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count)
        }
    });
});

module.exports = router;