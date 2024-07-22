const { response } = require("express");


const isAdminRol = (req, res = response, next) => {
    if( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin verificar el token primero'
        });
    }

    const { rol, name } = req.user;

    if( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: 'No tiene privilegios de administrador'
        });
    };
    next();
};

const haveRol = (...rols) => {
    return (req, res = response, next) => {
        if( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin verificar el token primero'
            });
        };

        if( !rols.includes( req.user.rol ) ) {
            return res.status(401).json({
                msg: 'No tiene privilegios para realizar esta acción'
            });
        };

        next();
    };
};


module.exports = {
    isAdminRol,
    haveRol
}