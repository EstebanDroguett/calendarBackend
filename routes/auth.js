/*
Rutas de Usuarios / Auth
host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldsValidators } = require('../middelwares/fields-validators');
const { jwtValidate } = require('../middelwares/jwt-validate');

const router = Router();


router.post('/register',
    [//Middelwares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldsValidators
    ],
    createUser);

router.post('/',
    [//Middelwares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldsValidators
    ],
    loginUser);

router.get('/revalidateToken', jwtValidate, revalidateToken);

module.exports = router;