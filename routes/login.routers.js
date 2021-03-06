const { Router } = require('express');
const { login } = require('../controllers/login.controllers')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarcampos');

const router = Router();
router.post('/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
  ],
  login
);
module.exports = router;
