const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImage } = require('../controllers/uploads');
const { validateField } = require('../middlewars/validationFields');
const { allowedCollections } = require('../helpers/dbValidators');

const router = Router();

router.post('/', uploadFile);

router.put('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['user', 'product'])),
    validateField
], updateImage);


module.exports = router;