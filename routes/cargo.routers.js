const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarcampos');
const { getCargo, crearCargo, actualizarCargo, eliminarCargo} = require('../controllers/cargo.controllers');

const router = Router();
router.get('/', getCargo);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('calificado','La calificacion es obligatorio').not().isEmpty(),
    check('salario','El salario es obligatorio').not().isEmpty(),
    validarCampos,


], crearCargo);
router.put('/:id',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('calificado','La calificacion es obligatorio').not().isEmpty(),
    check('salario','El salario es obligatorio').not().isEmpty(),
    validarCampos, 
], actualizarCargo);

router.delete('/:id',eliminarCargo)

module.exports = router;