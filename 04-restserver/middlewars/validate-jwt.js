const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req = request, res = response, next) => {
    //Esta funcion permite leer la informacion que llegue por los headers
    const token = req.header('x-token');
    
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        //Esta funcion sirve para verificar si el jwt es valido
        jwt.verify( token, process.env.SECRETKEY );

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