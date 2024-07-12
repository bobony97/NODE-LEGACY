const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

// Configura el motor de plantillas que se utilizará para renderizar las vistas. En este caso, está configurando Handlebars (hbs) como el motor de plantillas predeterminado.
app.set('view engine', 'hbs');

// Configurar la carpeta de parciales
//Los "parciales" son fragmentos de plantillas reutilizables que puedes incluir en otras plantillas
hbs.registerPartials(__dirname + '/views/partials');

//middleware para contenido statico
app.use(express.static('public'));

// app.get('/', (req, res) =>{
//     res.send('Home');
// });

// app.get('/hola', (req, res) =>{
//     res.send('Hola Mundo');
// });


app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Fernando Perez',
        titulo: 'Curso de node'
    });
});
app.get('/generic', (req, res) => {
    res.render('generic');
})
app.get('/elements', (req, res) => {
    res.render('elements');
})

//Redirecciona al usuario a otro archivo cuando se ingresa una ruta que no este dentro de la aplicacion
// app.get('*', (req, res) =>{
//     res.sendFile(__dirname + '/public/404.html');
// });


app.listen(8080);

console.log('Aplicacion levantada en el puerto: ' + 8080);