require('dotenv').config();
const cors = require('cors');
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
        //CORS: Es una política de seguridad que permite a los servidores especificar qué orígenes pueden acceder a sus recursos.
        this.app.use(cors());

        //se utiliza para montar funciones de middleware en una aplicación Express
        this.app.use(express.static('public')); //se utiliza para servir archivos estáticos, como imágenes, CSS, JavaScript y otros recursos, desde un directorio específico. 
                                                //En este caso, el directorio es public.
        
    }

    routes() {
        //Monta el enrutador importado de ../routes/user en la ruta /api/user.
        //Esto va hacer que cualquier peticion relacionada con usuarios, deba pasar por la ruta .../api/user
        this.app.use('/api/user', require('../routes/user'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    };
};

module.exports = Server;