const { Router, response } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewars/validationFields');
const { validateJWT } = require('../middlewars/validate-jwt');
const { createCategory } = require('../controllers/categories');

const router = Router();

/**
 * ({url})/api/categories
 */

//Obtener todas las categorias - publico
router.get('/', (req, res = response) => {
    res.json({
        msg: 'todo ok'
    });
});

//Obtener una categoria por id - publico
router.get('/:id', (req, res = response) => {
    res.json({

    });
});

//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], createCategory);

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', (req, res = response) => {
    res.json({

    });
});

//Borrar categoria - admin
router.delete('/:id', (req, res = response) => {
    res.json({

    });
});


module.exports = router;