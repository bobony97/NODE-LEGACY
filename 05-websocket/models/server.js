require('dotenv').config();
const cors = require('cors');
const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //Esto crea el servidor para los sockets
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.middlewares();
        this.routes();
    };

    middlewares() {
        this.app.use(cors());

        this.app.use(express.static('public'));  
    }

    routes() {

    };

    listen() {
        //Iniciamos el servidor con socket
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    };
};

module.exports = Server;