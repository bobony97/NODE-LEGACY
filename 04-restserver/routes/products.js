const Router = require('express');
const { check } = require('express-validator');

const router = Router();

router.post('/');
router.get('/');
router.get('/:id');
router.put('/:id');
router.delete('/:id');



module.exports = router;