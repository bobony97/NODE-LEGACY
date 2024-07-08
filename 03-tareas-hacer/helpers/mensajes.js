require('colors');

const showMenu = () => {
    console.clear();

    console.log('================================'.green);
    console.log('     Seleccione una Opción'.green);
    console.log('================================\n'.green);

    console.log(`${ '1.'.green } Crear Tarea`);
    console.log(`${ '2.'.green } Listar Tareas`);
    console.log(`${ '3.'.green } Listar Tareas Completadas`);
    console.log(`${ '4.'.green } Listar Tareas Pendientes`);
    console.log(`${ '5.'.green } Completar Tarea(s)`);
    console.log(`${ '6.'.green } Borrar Tarea`);
    console.log(`${ '0.'.green } Salir\n`);

    //Esto permite crear una interfaz de linea de comandos, para ingresar valores por consola y obtener un respuesta
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //Esto es para mostrar la pregunta al usuario
    readline.question('Seleccione una opción:', (opt) => {
        console.log({opt});
        readline.close();
    });
}

const pause = () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
        readline.close();
    });
}

module.exports = {
    showMenu,
    pause
}