/*//Importamos conexion con Base de datos de archivo Secrets
const db = require('../config/secrets');

//Creamos la contante USERS con las llamadas
const user = {
    //DEVUELVE TODOS LOS USUARIOS
    getAllUsers: function (callback) {
        return db.query("select * from usuarios order by usuarios_id DESC", callback);
    },
    //DEVUELVE UN USUARIO POR ID
    getUserById: function (id, callback) {
        return db.query("select * from usuarios where usuarios_id=?", [id], callback);
    },
    //BORRA UN USUARIO POR ID
    deleteUser: function (id, callback) {
        return db.query("delete from usuarios where usuarios_id=?", [id], callback);
    },
    //UPDATE USUARIO POR ID
    updateUser: function (id, nuevoUsuario, callback) {
        return db.query("update usuarios set? where usuarios_id?", [usuario, id], callback);
    },
    //CREATE NEW USER
    createNewUser: function (usuario, callback) {
        const nuevoUsuario = {
            name: usuarios.nombreUsuario,
            password: usuarios.password,
            email: usuarios.email,
            admin: usuarios.admin
        };
        return db.query("insert into usuarios set ?", user, callback);
    }
};
module.exports = user;
*/

