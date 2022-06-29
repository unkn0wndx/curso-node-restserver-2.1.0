//! Ruta de Autenticaciones de usuarios
//! Se guardan las rutas (URLs)

const { Router } = require('express');
const { check } = require('express-validator'); //? Valida data

const {login} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

//? Ruta Completa /api/auth/login
router.post('/login',
[
  check('correo', 'El correo es obligatorio').isEmail(),//* Valida que sea un correo valido
  check('password', 'La contraseña es obligatoria').not().isEmpty(), //* Valida que haya un contraseña
  validarCampos
]
,login)

module.exports = router;
