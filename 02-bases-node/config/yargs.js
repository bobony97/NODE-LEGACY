const argv = require('yargs')
                .option('b',{
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Es la base de la tabla de multiplicar'
                })
                .option('l',{
                    alias: 'listar',
                    type: 'boolean',
                    default: false,
                    describe: 'Muestra la tabla en consola'
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

            
module.exports = argv;