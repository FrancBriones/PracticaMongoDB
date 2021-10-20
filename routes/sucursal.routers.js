const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarcampos');
const { getSucursal, crearSucursal, actualizarSucursal, eliminarSucursal} = require('../controllers/sucursal.controllers');
const { Router } = require('express');
const router = Router();
router.get('/', getSucursal);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('region','La region es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatorio').not().isEmpty(),
    validarCampos,
], crearSucursal);

router.put('/:id',
[
    check('region','La region es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatorio').not().isEmpty(), 
    validarCampos, 
], actualizarSucursal);

router.delete('/:id',eliminarSucursal)

module.exports = router;