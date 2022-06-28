//! Creación de Esquemas o Modelas para la base de datos

const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio']
  }
})

module.exports = model('Role', RoleSchema);