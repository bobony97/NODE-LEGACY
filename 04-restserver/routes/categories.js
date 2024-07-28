const { Router, response } = require('express');
const { check } = require('express-validator');

const { validateField } = require('../middlewars/validationFields');
const { validateJWT } = require('../middlewars/validate-jwt');
const { createCategory, getAllCategories, getCategoryById, editCategoryById, deleteCategory } = require('../controllers/categories');
const { existCategoryId } = require('../helpers/dbValidators');
const { isAdminRol } = require('../middlewars/validate-rol');

const router = Router();

/**
 * ({url})/api/categories
 */

//Obtener todas las categorias - publico
router.get('/', getAllCategories);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existCategoryId)
], getCategoryById);

//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], createCategory);

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existCategoryId),
    validateField
], editCategoryById);

//Borrar categoria - admin
router.delete('/:id', [
    validateJWT,
    isAdminRol,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existCategoryId),
    validateField
], deleteCategory)





module.exports = router;