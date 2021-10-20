const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarcampos');
const { validarJWT } = require ('../middlewares/validarJWT');
const { getEmpleado, crearEmpleado, actualizarEmpleado, eliminarEmpleado} = require('../controllers/empleado.controllers');
const { Router } = require('express');
const router = Router();
router.get('/', validarJWT, getEmpleado);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('email','El email obligatorio').isEmail(),
    check('password','La contraseña es  obligatoria').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('fechanacer','La fecha de nacimiento es obligatorio').not().isEmpty(),
    validarCampos,
], crearEmpleado);

router.put('/:id',
[
    validarJWT,
    check('email','El email obligatorio').isEmail(),
    check('direccion','La direccion es obligatorio').not().isEmpty(),
    validarCampos, 
], actualizarEmpleado);

router.delete('/:id',validarJWT, eliminarEmpleado)

module.exports = router;