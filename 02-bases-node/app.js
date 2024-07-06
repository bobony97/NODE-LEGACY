const { crearArchivo } = require('./helpers/multiplicar');

console.clear();

//Esto extrae la informacion que llega de la consola
const [, , arg3] = process.argv;
//Esto extrae el valor que obtenemos de la consola
const [, base = 5] = arg3.split('=');

// const base = 3;

crearArchivo( base )
    .then((nombreArchivo) => console.log(nombreArchivo))
    .catch((err) => console.log(err));
