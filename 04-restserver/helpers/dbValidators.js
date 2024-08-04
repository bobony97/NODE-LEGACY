const Rol = require('../models/rol');
const User = require('../models/usuario');
const Category = require('../models/categories');
const product = require('../models/product');

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

const existCategoryId = async(id) => {
    const isCategoryExist = await Category.findById(id);
    if(!isCategoryExist) throw new Error(`El ID: ${id}, no existe`);
}

const existProductById = async(id) => {
    const isProductExiste = await product.findById(id);
    if(!isProductExiste) throw new Error(`El ID: ${id}, no existe`);
};

const allowedCollections = async(collection = '', collections = []) => {
    const included = collections.includes(collection);

    if( !included ) {
        throw new Error(`La colección ${collection}, no es valida, ${collections}`);
    };

    return true;
};


module.exports = {
    isValidRol,
    existEmail,
    existUserId,
    existCategoryId,
    existProductById,
    allowedCollections
}