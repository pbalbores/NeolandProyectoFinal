const jwt = require('jsonwebtoken')

exports.checkToken = (req, res, next) => {
    if (!req.headers['user-token']) {
        return res.json({ error: 'Debes incluír el Token' });
    }

    const userToken = req.headers['user-token']
    jwt.verify(userToken, 'CLAVE-SUPERSECRETA', (err, validToken) => {
        if (err) {
            return res.json({ error: 'El token es incorrecto' })
        } else {
            next();
        }
    })


    next();


}