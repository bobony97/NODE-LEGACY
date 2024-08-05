require('dotenv').config();
const cors = require('cors');
const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
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
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    };
};

module.exports = Server;