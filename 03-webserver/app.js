const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Home');
});

app.get('/hola', (req, res) =>{
    res.send('Hola Mundo');
});

app.get('*', (req, res) =>{
    res.send('404 | Page not found');
});

app.listen(8080);

console.log('Aplicacion levantada en el puerto: ' + 8080);