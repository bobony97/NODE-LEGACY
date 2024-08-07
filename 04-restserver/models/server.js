require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //CONEXIÓN A LA BASE DE DATOS
        this.connectDb();

        //MIDDLEWARE
        this.middlewares();

        //RUTAS
        this.routes();
    };

    async connectDb() {
        await dbConnection();
    };

    middlewares() {
        //CORS: Es una política de seguridad que permite a los servidores especificar qué orígenes pueden acceder a sus recursos.
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //se utiliza para montar funciones de middleware en una aplicación Express
        this.app.use(express.static('public')); //se utiliza para servir archivos estáticos, como imágenes, CSS, JavaScript y otros recursos, desde un directorio específico. 
                                                //En este caso, el directorio es public.

        //Maneja la carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            //Esto es para poder crear directorios en caso de no existir
            createParentPath: true
        }));
        
    }

    routes() {
        //Monta el enrutador importado de ../routes/user en la ruta /api/user.
        //Esto va hacer que cualquier peticion relacionada con usuarios, deba pasar por la ruta .../api/user
        this.app.use('/api/user', require('../routes/user'));
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/category', require('../routes/categories'));
        this.app.use('/api/product', require('../routes/products'));
        this.app.use('/api/search', require('../routes/search'));
        this.app.use('/api/upload', require('../routes/uploads'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    };
};

module.exports = Server;