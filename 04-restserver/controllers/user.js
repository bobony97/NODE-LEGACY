const { response, request } = require('express');
const bcrypt = require('bcryptjs');


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

const postUsers = async(req, res = response) => {
    try {
        //Obtenemos la informacion que el usuario mande en el body en la peticion post
        const { name, password, email, rol } = req.body;

        //Seteamos toda la informacion enviada por el usuario a la instancia del modelo para la base de datos
        const user = new User({ name, password, email, rol });

        //Verificar si el correo existe
        const existEmail = await User.findOne({email});
        if(existEmail) {
            return res.status(400).json({
                msg: 'El correo ya esta registrado'
            });
        }

        //Encriptar la contraseña
        //Esto permite añadir una cadena de caracteres aleatorias antes de hashear en este caso la contraseña, esta funcion espera un parametro, este es para calcular el numero de vueltas
        //que debe dar para aplicar el hashing, esto mejora la seguridad pero tambien aumenta el tiempo necesario para generar el hash. Por defecto es 10
        const salt = bcrypt.genSaltSync(10);

        user.password = bcrypt.hashSync(password, salt);
    
        //Seteamos la informacion a la db
        await user.save();

        res.json({
            msg: 'post API - controlador',
            user
        });
    } catch (error) {
        console.log(error);
    }
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