require('colors');

const { inquirerMenu } = require('./helpers/inquirer');
const { pause } = require('./helpers/mensajes');

const main = async() => {
    console.clear();

    let opt = '';

    do {
       opt = await inquirerMenu();
       console.log(opt)
       if(opt !== '0') await pause();
    } while(opt !== '0');
}

main();