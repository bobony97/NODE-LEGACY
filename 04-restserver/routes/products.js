const Router = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewars/validate-jwt');
const { validateField } = require('../middlewars/validationFields');
const { createProduct, getAllProducts, getProductById, editProductById, deleteProduct } = require('../controllers/product');
const { existProductById, existCategoryId } = require('../helpers/dbValidators');
const { isAdminRol } = require('../middlewars/validate-rol');

const router = Router();

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'La categoría no tiene un id valido').isMongoId(),
    check('category').custom(existCategoryId),
    validateField
], createProduct);

router.get('/', getAllProducts);

router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existProductById),
    validateField
], getProductById);

router.put('/:id', [
    validateJWT,
    isAdminRol,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existProductById),
    validateField
], editProductById);

router.delete('/:id', [
    validateJWT,
    isAdminRol,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existProductById),
    validateField
], deleteProduct);



module.exports = router;