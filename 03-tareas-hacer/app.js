require('colors');

const { showMenu, pause } = require('./helpers/mensajes');

const main = async() => {
    console.clear();
    console.log('Hola Mundo');

    showMenu()
    // pause();
}

main();