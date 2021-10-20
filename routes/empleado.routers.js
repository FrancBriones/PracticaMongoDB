const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarcampos');
const { getEmpleado, crearEmpleado, actualizarEmpleado, eliminarEmpleado} = require('../controllers/empleado.controllers');
const { Router } = require('express');
const router = Router();
router.get('/', getEmpleado);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatorio').not().isEmpty(),
    check('fechanacer','La fecha de nacimiento es obligatorio').not().isEmpty(),
    validarCampos,
], crearEmpleado);

router.put('/:id',
[
    check('email','El email obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatorio').not().isEmpty(),
    validarCampos, 
], actualizarEmpleado);

router.delete('/:id',eliminarEmpleado)

module.exports = router;