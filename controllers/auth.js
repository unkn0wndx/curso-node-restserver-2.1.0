//! Controlador (Funcion) para la autentificación de usuarios

const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario'); //? Modelo 'Usuario' de la base de datos
const { generarJWT } = require('../helpers/generar-jwt'); //? Generador de JWT


const login = async (req, res = response) => {

  const { correo, password } = req.body; //* Extrae datos del body o peticion 'POST'

  try {

    //Verificar si el email existe
    //? Buscara el correo en la base de datos
    const usuario = await Usuario.findOne({ correo });

    //?Verificara que el email existe en la base de datos
    if (!usuario) {
      return res.status(400).json({ msg: 'Usuario / Password no son correctos - correo' });
    }

    //? Verifica si el usuario es valido 
    //Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      });
    }

    //Verificar la contraseña
    //? Verificara si la contraseña dada es igual a la almacenada en la base de datos
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    //Generar el JWT
    //? Generamos el JWT transformando el callback en una funcion asincrona 'asycn'
    const token = await generarJWT(usuario.id);

    res.json({
      usuario, token
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
}

module.exports = { login };