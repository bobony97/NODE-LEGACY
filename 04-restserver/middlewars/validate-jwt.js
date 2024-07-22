const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario');


const validateJWT = async(req = request, res = response, next) => {
    //Esta funcion permite leer la informacion que llegue por los headers
    const token = req.header('x-token');
    
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        //Esta funcion sirve para verificar si el jwt es valido
        const { uid } = jwt.verify( token, process.env.SECRETKEY );

        //Obtenemos la informacion del usuario logueado
        const user = await User.findById(uid);
        
        if( !user ) {
            return res.status(401).json({
                msg: 'Token no valido - El usuario no existe'
            });
        }

        //Verifica si el uid del usuario no se ha eliminado
        if( !user.state ) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario eliminado'
            });
        };

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

};


module.exports = {
    validateJWT
}