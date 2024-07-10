const http = require('http');

http.createServer( (request, response) => {
    response.write('Hola Mundo');
    response.end();
})
.listen( 3000 );

console.log('Escuchando el puerto ',  3000);