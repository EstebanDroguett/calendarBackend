/*
Rutas de Usuarios / Auth
host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { fieldsValidators } = require('../middelwares/fields-validators');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { jwtValidate } = require('../middelwares/jwt-validate');

const router = Router();

//Validar los eventos
router.use(jwtValidate);


//Obtener eventos
router.get('/', getEvents);

//Crear un nuevo evento
router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalziación es obligatoria').custom(isDate),
        fieldsValidators
    ],
    createEvent);

//Actualizar evento
router.put('/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalziación es obligatoria').custom(isDate),
        fieldsValidators
    ], updateEvent);

//Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;