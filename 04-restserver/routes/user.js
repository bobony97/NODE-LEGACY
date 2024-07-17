const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/user');
const { validateField } = require('../middlewars/validationFields');
const router = Router();

// this.app.get('/api', (req, res) => {
//     res.send('Hello World');
// });

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener mas de 6 letras').isLength({ min: 6 }),
    check('email', 'No es un email valido').isEmail(),
    check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateField
] ,postUsers);

router.delete('/', deleteUsers);



module.exports = router;