//! Valida que el usuario logueado sea valido

const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); //* Importar Modelo de la base de datos

//^ 'next' es para continuar con las siguietes funciones despues de haber ejecutado el codigo
//^ Se agrega igual 'request' a 'req' para tener el autocompletado de la funcion
const validarJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token')

  if (!token) { //? status '401' es solicitud no autorizada
    return res.status(401).json({
      msg: 'No token'
    })
  }

  try {

    //* Extrae el 'uid' del 'token'
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //* El usuario autenticado aparecera junto con el usuario eliminado
    const usuario = await Usuario.findById(uid);

    //* Validar que el usuario exista en la DB
    if(!usuario){//? status '401' es solicitud no autorizada
      return res.status(401).json({ msg: 'Token not found' });
    }

    //* Validar que el usuario logueado no ha sido eliminado
    if(!usuario.estado){//? status '401' es solicitud no autorizada
      return res.status(401).json({ msg: 'Token no valido'});
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ //? status '401' es solicitud no autorizada
      msg: 'No token'
    })
  }

}

module.exports = { validarJWT }