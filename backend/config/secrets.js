//Configuramos acceso a base de datos
const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'hl765.dinaserver.com',
    user: 'desarrollo00',
    password: 'desarrollo',
    database: 'quefacernacosta'
});
module.exports = connection;
