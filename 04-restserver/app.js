//se utiliza para cargar variables de entorno desde un archivo .env.
require('dotenv').config();

const express = require('express');
const app = express();

//Se trae la informacion del puerto desde el ".env"
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('hola mundo');
})

//Utilizamos la constante "port" en donde esta almacenado el puerto de la app
app.listen(process.env.PORT, () => {
    console.log('Aplicacion corriendo en puerto: ' + port);
});
