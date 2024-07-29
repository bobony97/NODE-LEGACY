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
        res.status(200).json({
            results: (user) ? [ user ] : []
        });
    };
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

        case 'category': {

        }
        break;

        case 'product': {

        }
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