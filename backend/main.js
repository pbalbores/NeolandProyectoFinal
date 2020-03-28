//Inicamos proyecto.
//Importamos Express
const express = require('express');
const helmet = require('helmet');




//Creamos servidor
const server = express();

//
server.use(helmet());

//Creamos servidor estático
server.use(express.static('static))

//Llamadas
server.get("/", (req, res) => {
    res.send("Hola Mundo");
});



//Definimos puerto de servidor
//const PORT = process.env.PORT;
const PORT = 3000;

//Ponemos servidor a escuchar
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
