const { response, request } = require('express');

const User = require('../models/usuario');

const getUsers = (req = request, res = response) => {
    //Obtenemos toda la informacion enviada por la ruta 
    const params = req.query;
    res.json({
        msg: 'get API - controlador',
        params
    });
};

const putUsers = (req, res = response) => {
    //Obtenemos la informacion que el usuario mande en la ruta en la peticion put
    const id = req.params.id
    res.json({
        msg: 'put API - controlador',
        id
    });
};

const postUsers = async(req, res) => {
    //Obtenemos la informacion que el usuario mande en el body en la peticion post
    const body = req.body;

    //Seteamos toda la informacion enviada por el usuario a la instancia del modelo para la base de datos
    const user = new User(body);
    
    //Seteamos la informacion a la db
    await user.save();

    res.json({
        msg: 'post API - controlador',
        user
    });
};

const deleteUsers = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    });
};

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}