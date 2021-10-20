const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarcampos');
const { getInforme, crearInforme, actualizarInforme, eliminarInforme} = require('../controllers/informe.controllers');

const router = Router();
router.get('/', getInforme);
router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('version','La version es obligatorio').not().isEmpty(),
    validarCampos,
], crearInforme);
router.put('/:id',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('version','La version es obligatorio').not().isEmpty(),
    validarCampos, 
], actualizarInforme);

router.delete('/:id',eliminarInforme)

module.exports = router;