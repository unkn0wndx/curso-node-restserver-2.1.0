//! Optimización de las importaciones

//^ Middlewares -->
const validaCampos = require('../middlewares/validar-campos'); //* Modulo que valida la data
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles'); 

//^ Con '...' se exportaran todos los modulos asiganados a las siguientes variables
module.exports = {...validaCampos, ...validarJWT, ...validaRoles};