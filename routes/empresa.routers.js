const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarcampos');
const { getEmpresa, crearEmpresa, actualizarEmpresa, eliminarEmpresa} = require('../controllers/empresa.controllers');
const router = Router();
router.get('/', getEmpresa);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('ruc','El ruc es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatorio').not().isEmpty(),
    validarCampos,
], crearEmpresa);

router.put('/:id',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatorio').not().isEmpty(),
    check('ruc','El ruc es obligatorio').not().isEmpty(),
    validarCampos, 
], actualizarEmpresa);

router.delete('/:id',eliminarEmpresa)

module.exports = router;