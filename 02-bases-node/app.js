const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('yargs')
                .option('b',{
                    alias: 'base',
                    type: 'number',
                    demandOption: true
                })
                .option('l',{
                    alias: 'listar',
                    type: 'boolean',
                    demandOption: true,
                    default: false
                })
                //Esto chequea que la informacion enviada por consola sea un numero, caso contrario muestra un mensaje de error
                .check( (argv, options) => {
                    if(isNaN(argv.b)) {
                        throw 'La base tiene que ser un numero';
                    }
                    //Si no hay errores tiene que retornar "true"
                    return true;
                })
                .argv;

console.clear();

//FORMA TRADICIONAL DE TRAER INFORMACION DE LA CONSOLA
//Para que esto funcione se debe enviar el comando de ejecucion del programa junto a un tercer argumento para que se lo pueda desestructurar EJ: node app.js --base=5
//Esto extrae la informacion que llega de la consola
// const [, , arg3] = process.argv;
//Esto extrae el valor que obtenemos de la consola
// const [, base = 5] = arg3.split('=');

console.log(argv);

// const base = 3;

crearArchivo( argv.b, argv.l )
    .then((nombreArchivo) => console.log(nombreArchivo))
    .catch((err) => console.log(err));
