const { response, request } = require('express');
const User = require('../models/usuario');
const bcrypt = require('bcryptjs');


const getUsers = async(req = request, res = response) => {
    //Obtenemos toda la informacion enviada por la ruta 
    // const params = req.query;

    const { limit = 5, from = 0} = req.query;

    //Obtenemos todos los usuarios de la base de datos, con paginacion
    // const users = await User.find({ state: true })  //Este objeto que enviamos determina que solo vamos a querer que traiga los registros de los usuarios activos
        // .skip( Number(from) )   //Permite implementar desde que valor queremos obtener 
        // .limit(Number(limit));  //Permite implementar hasta que valor queremos obtener 

    //Esto permite obtener la cantidad de registros en la DB
    // const total = await User.countDocuments({ state: true });

    //Esto permite disparar varias promesas
    const [ total, users ] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true })
            .skip( Number(from) )
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    });
};

const putUsers = async(req, res = response) => {
    //Obtenemos la informacion que el usuario mande en la ruta en la peticion put
    const { id } = req.params
    const { _id, password, google, ...rest } = req.body;

    if(password) {
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(password, salt);
    }

    //Este metodo permite buscar informacion en la base de datos por ir y actualizarla
    const userDb = await User.findByIdAndUpdate(id, rest, {new: true});

    res.json({
        userDb
    });
};

const postUsers = async(req, res = response) => {
    try {
        //Obtenemos la informacion que el usuario mande en el body en la peticion post
        const { name, password, email, rol } = req.body;

        //Seteamos toda la informacion enviada por el usuario a la instancia del modelo para la base de datos
        const user = new User({ name, password, email, rol });

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