const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarcampos');
const { getArea, crearArea, actualizarArea, eliminarArea} = require('../controllers/area.controllers');
const router = Router();
router.get('/', getArea);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('presupuesto','El presupuesto es obligatorio').not().isEmpty(),
    validarCampos,
], crearArea);

router.put('/:id',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('presupuesto','El presupuesto es obligatorio').not().isEmpty(),
    validarCampos, 
], actualizarArea);

router.delete('/:id',eliminarArea)

module.exports = router;