const Rol = require('../models/rol');
const User = require('../models/usuario');

//Esta validacion va a verificar si el rol ingresado es compatible con los que hay cargados en la db
const isValidRol = async(rol = '') => {
    const existRol = await Rol.findOne({rol});
    if(!existRol) {
        throw new Error(`El rol ${rol}, no esta registrado en la base de datos`);
    };
}

//Verificar si el correo existe
const existEmail = async(email = '') => {
    const isExistEmail = await User.findOne({email});
    if(isExistEmail) throw new Error(`El email: ${email} ingresado ya esta registrado`);
}

const existUserId = async(id) => {
    const isUserExist = await User.findById(id);
    if(!isUserExist) throw new Error(`El ID: ${id}, no existe`);
}


module.exports = {
    isValidRol,
    existEmail,
    existUserId
}