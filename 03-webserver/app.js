const express = require('express');
const app = express();

//middleware para contenido statico
app.use(express.static('public'));


app.get('/', (req, res) =>{
    res.send('Home');
});

app.get('/hola', (req, res) =>{
    res.send('Hola Mundo');
});

//Redirecciona al usuario a otro archivo cuando se ingresa una ruta que no este dentro de la aplicacion
app.get('*', (req, res) =>{
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(8080);

console.log('Aplicacion levantada en el puerto: ' + 8080);