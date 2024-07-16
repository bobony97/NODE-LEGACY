const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/user');
const router = Router();

// this.app.get('/api', (req, res) => {
//     res.send('Hello World');
// });

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', [
    check('email', 'El email no es valido').isEmail()
] ,postUsers);

router.delete('/', deleteUsers);



module.exports = router;