const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const User = require('../models/usuario');
const Product = require('../models/product');
const Category = require('../models/categories');



const allowedCollections = [
    'user',
    'category',
    'product',
    'rol'
];

const searchUsers = async(terminus = '', res = response) => {
    //Valida si lo que se le envia por argumento es un id valido de mongo
    const isMongoId = ObjectId.isValid(terminus);

    if(isMongoId) {
        const user = await User.findById(terminus);
        return res.status(200).json({
            results: (user) ? [ user ] : []
        });
    };

    //Se utiliza esta expresion regular para indicar que la busqueda va a ser insensible a las mayusculas y minusculas
    const regex = new RegExp(terminus, 'i');

    //Indicamos que la expresion regular tiene que hacer match con el nombre o con el correo
    const users = await User.find({ 
        $or: [ {name: regex}, { email: regex }],
        $and: [{ state: true }]
    });

    res.status(200).json({
        results: users
    });
};

const searchCategory = async(terminus = '', res = response) => {
    const isMongoId = ObjectId.isValid(terminus);

    if(isMongoId) {
        const category = await Category.findById(terminus);
        return res.status(200).json({
            results: (category) ? [ category ] : []
        });
    };

    const regex = new RegExp(terminus, 'i');

    const categories = await Category.find({ state: regex, state: true});

    res.status(200).json({
        results: categories
    });
};

const searchProduct = async(terminus = '', res = response) => {
    const isMongoId = ObjectId.isValid(terminus);

    if(isMongoId) {
        const product = await Product.findById(terminus)
                                    .populate('category', 'name');
        return res.status(200).json({
            results: (product) ? [ product ] : []
        });
    };

    const regex = new RegExp(terminus, 'i');

    const products = await Product.find({ state: regex, state: true})
                                    .populate('category', 'name');

    res.status(200).json({
        results: products
    });
};


const search = async(req, res = response) => {

    const { collection, terminus } = req.params;

    if(!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ allowedCollections }`
        });
    };

    switch(collection) {
        case 'user': 
            searchUsers(terminus, res)
        break;

        case 'category': 
            searchCategory(terminus, res)
        break;

        case 'product': 
            searchProduct(terminus, res)
        break;

        default: 
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            });
    };
};

module.exports = {
    search
}