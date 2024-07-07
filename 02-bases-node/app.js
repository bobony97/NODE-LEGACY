const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');

console.clear();

//FORMA TRADICIONAL DE TRAER INFORMACION DE LA CONSOLA
//Para que esto funcione se debe enviar el comando de ejecucion del programa junto a un tercer argumento para que se lo pueda desestructurar EJ: node app.js --base=5
//Esto extrae la informacion que llega de la consola
// const [, , arg3] = process.argv;
//Esto extrae el valor que obtenemos de la consola
// const [, base = 5] = arg3.split('=');

// const base = 3;

crearArchivo( argv.b, argv.l )
    .then((nombreArchivo) => console.log(nombreArchivo))
    .catch((err) => console.log(err));
