//! Validaciones personalizadas
const Role = require('../models/role');
const Usuario = require('../models/usuario'); //* Importar Modelo de la base de datos

//* Validates if 'rol' exists in db
const esRoleValido = async (rol = '') => {//? Roles
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El ROL ${rol} no esta registrado en la DB`);
  }
}

//* Validates if email exists in db
const emailExiste = async (correo = '') => {

  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo '${correo}' ya esta registrado`);
  }
}

//* Validates if user exists in db
const existeUsuarioPorID = async (id) => {

  const existeUsuario = await Usuario.findById(id)

  if (!existeUsuario) {
    throw new Error(`El ID:'${id}' no esta registrado`);
  }
}


module.exports = { esRoleValido, emailExiste, existeUsuarioPorID };