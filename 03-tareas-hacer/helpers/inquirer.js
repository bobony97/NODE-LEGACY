const inquirer = require('inquirer');

require('colors');

const questions = [
    {
        type: 'list',
        name: 'opt',
        message: '¿Que desea hacer?',
        choices: ['opt1', 'opt2', 'opt3']
    }
];

const inquirerMenu = async() => {

    console.log('================================'.green);
    console.log('     Seleccione una Opción'.green);
    console.log('================================\n'.green);

    const prompt = inquirer.createPromptModule();
    const { opt } = await prompt(questions);

    return opt;
}

module.exports = {
    inquirerMenu
}