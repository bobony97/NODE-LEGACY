const Rol = require('../models/rol');

//Esta validacion va a verificar si el rol ingresado es compatible con los que hay cargados en la db
const isValidRol = async(rol = '') => {
    const existRol = await Rol.findOne({rol});
    if(!existRol) {
        throw new Error(`El rol ${rol}, no esta registrado en la base de datos`);
    };
}


module.exports = {
    isValidRol
}