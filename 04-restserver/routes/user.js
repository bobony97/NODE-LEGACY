const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/user');
const { validateField } = require('../middlewars/validationFields');
const { isValidRol, existEmail } = require('../helpers/dbValidators');
const router = Router();

// this.app.get('/api', (req, res) => {
//     res.send('Hello World');
// });

//El primer parametro va a ser la ruta, el segundo parametro son los middleware (como validaciones) y como tercer parametro la peticion del controlador
router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener mas de 6 letras').isLength({ min: 6 }),
    check('email', 'No es un email valido').isEmail(),
    check('email').custom( existEmail ),
    //check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //check('rol').custom( (rol) => isValidRol(rol)): En este caso no es necesario enviar el argumento "rol" ya que la funcion "custom" se la va a enviar implícitamente
    check('rol').custom( isValidRol ),
    validateField,
] ,postUsers);

router.delete('/', deleteUsers);



module.exports = router;