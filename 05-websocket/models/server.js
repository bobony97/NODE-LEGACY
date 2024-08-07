require('dotenv').config();
const cors = require('cors');
const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();

        //require('http'): Importa el módulo HTTP nativo de Node.js, que se utiliza para crear servidores web.
        //Esto crea el servidor para los sockets
        this.server = require('http').createServer(this.app);

        //(this.server): Inicializa Socket.IO con el servidor HTTP creado en la línea anterior 
        //Esto permite que Socket.IO escuche y gestione las conexiones en tiempo real en el mismo servidor HTTP que maneja las solicitudes de la aplicación Express.
        this.io = require('socket.io')(this.server);

        //Configuracion de sockets
        this.sockets();

    };

    middlewares() {
        this.app.use(cors());

        this.app.use(express.static('public'));  
    }

    routes() {

    };

    sockets() {
        //Esto configura un manejador de eventos para el evento connection. Este evento se emite cada vez que un nuevo cliente se conecta al servidor mediante Socket.IO.
        //La función de callback que recibe como argumento el objeto socket representa la conexión individual con el cliente que se acaba de conectar.
        this.io.on('connection', socket => {
            console.log('Cliente Conectado', socket.id); //Imprime en la consola un mensaje indicando que un cliente se ha conectado, junto con el id único del socket correspondiente 
                                                        //a ese cliente.
                                                        
            //Configura un manejador de eventos para el evento disconnect. Este evento se emite cuando el cliente se desconecta del servidor.
            socket.on('disconnect', () => {
                console.log('Cliente Desconectado', socket.id);
            });

            //Recibiendo informacion del cliente
            // socket.on('send-message', ( payload ) => {  //El "send-message", es la informacion que el cliente esta emitiendo
            //     console.log('Mensaje recibido ', payload);
            // });

            //Esto va a emitir un mensaje a todos los usuarios conectados
            // socket.on('send-message', ( payload ) => {
                //El "this.io" es cuando envia el socket el mensaje, por lo tanto no va a chocar con el "send-message" del cliente
                // this.io.emit('send-message', payload);
            // });

            //Se envia la informacion por id de cliente
            socket.on('send-message', ( payload, callback ) => {
                const id = 123456;
                callback(id);
            });
        });

    };

    listen() {
        //Iniciamos el servidor con socket
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    };
};

module.exports = Server;