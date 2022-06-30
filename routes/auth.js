//! Ruta de Autenticaciones de usuarios
//! Se guardan las rutas (URLs)

const { Router } = require('express');
const { check } = require('express-validator'); //? Valida data

const {login, googleSignin} = require('../controllers/auth');
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

//? Ruta Completa /api/auth/google
router.post('/google',
[
  check('id_token', 'Token de google es necesario').not().isEmpty(),//* Valida que sea un correo valido
  validarCampos
],googleSignin)


module.exports = router;
