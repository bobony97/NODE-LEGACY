//se utiliza para recolectar los resultados de las validaciones ejecutadas por los middlewares de validación.
const { validationResult } = require('express-validator');

const validateField = ( req, res, next ) => {
    //Validando errores
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json(errors);
    };

    //Esto indica que siga con el siguiente middleware, caso contrario continua con el controlador
    next();
};

module.exports = {
    validateField
}