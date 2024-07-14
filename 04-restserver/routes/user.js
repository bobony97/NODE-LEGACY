const { Router } = require('express');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/user');
const router = Router();

// this.app.get('/api', (req, res) => {
//     res.send('Hello World');
// });

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', postUsers);

router.delete('/', deleteUsers);



module.exports = router;