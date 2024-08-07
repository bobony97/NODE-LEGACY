const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { validateField } = require('../middlewars/validationFields');
const { allowedCollections } = require('../helpers/dbValidators');
const { validateFile } = require('../middlewars/validateFile');

const router = Router();

router.post('/', validateFile,  uploadFile);

router.put('/:collection/:id', [
    validateFile,
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['user', 'product'])),
    validateField
], updateImageCloudinary);

router.get('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['user', 'product'])),
    validateField
], showImage);


module.exports = router;