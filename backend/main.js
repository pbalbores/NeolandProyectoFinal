//Inicamos proyecto.
//Importamos Express
const express = require('express');




//Creamos servidor
const server = express();

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
