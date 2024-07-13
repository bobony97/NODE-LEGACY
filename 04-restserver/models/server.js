require('dotenv').config();
const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //MIDDLEWARE
        this.middlewares();

        //RUTAS
        this.routes();
    };

    middlewares() {
        //se utiliza para montar funciones de middleware en una aplicación Express
        this.app.use(express.static('public')); //se utiliza para servir archivos estáticos, como imágenes, CSS, JavaScript y otros recursos, desde un directorio específico. 
                                                //En este caso, el directorio es public.
        
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World');
        });
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    };
};

module.exports = Server;