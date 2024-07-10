const http = require('http');

http.createServer( (request, response) => {

    //Esto se utiliza para establecer un encabezado HTTP en la respuesta antes de que se envíe al cliente. 
    //Este método es parte del objeto response, que representa la respuesta HTTP que se enviará al cliente. 
    //A diferencia de writeHead, que establece todos los encabezados de una vez, setHeader se utiliza para configurar encabezados individuales de manera incremental.
    response.setHeader('Content-Disposition', 'attachment: filename=Lista.csv');

    //Esto  permite establecer el código de estado HTTP y los encabezados de respuesta antes de enviar el cuerpo de la respuesta. 
    //Es útil para especificar el tipo de contenido, codificaciones, cookies, y otros metadatos de la respuesta HTTP.
    response.writeHead(200, {'Content-Type': 'application/csv'});

    // Escribe datos en el cuerpo de la respuesta y se puede llamar múltiples veces antes de finalizar la respuesta.
    response.write('id, nombre\n');
    response.write('1, pedro\n');
    response.write('2, pe\n');
    response.write('3, juan\n');

    // Finaliza la respuesta, opcionalmente escribiendo datos adicionales. Debe llamarse para que el servidor sepa que se han terminado de enviar datos y pueda cerrar la conexión.
    response.end();
})
.listen( 3000 );

console.log('Escuchando el puerto ',  3000);