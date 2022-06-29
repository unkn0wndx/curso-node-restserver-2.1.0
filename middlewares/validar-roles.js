//^ Un middleware es una simple funcion
//! Validar el role del usuario, solo 'ADMIN_ROLE' puede eliminar usuarios

const { response, request } = require("express")

const esAdminRole = (req = request, res = response, next) => {

  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere validar el role sin validar el token primeo'
    })
  }

  const { rol, nombre } = req.usuario;

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: `${nombre} no es Administrador` })
  }

  next();
}

//^ '...' hace que 'roles' almacene todos los roles mandados como argumentos
const tieneRole = (...roles) => {
  return (req, res = response, next) => {

    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere validar el role sin validar el token primero'
      })
    }

    //* Valida que el usuario tenga cualquiera de los 'roles'  
    if (!roles.includes(req.usuario.rol)) {
        return res.status(401).json({ msg: `El servicio requiere uno de estos roles ${roles}` });
    }

    next();
  }

}

module.exports = { esAdminRole, tieneRole }