//! Creacion de Esquemas o Modelas para la base de datos

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({ //? Modelo o Esquema de la Coleccion Usuarios

  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'] //* Tiene que ser obligatorio
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'], //* Tiene que ser obligatorio
    unique: true //! Validacion: Tiene que ser unico
  },
  password: {
    type: String,
    required: [true, 'La correo es obligatorio'] //* Tiene que ser obligatorio
  },
  imagen: {
    type: String //* No e obligatorio
  },
  rol: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }

});

//* Cuando el registro de la data sea exitoso, no imprimira la "contrase;a" y "__v" 
UsuarioSchema.methods.toJSON = function (req, res) {
  const { __v, password, ...usuario } = this.toObject(req, res);
  return usuario; //* retorna un nuevo array sin "password" and "__v"
}

module.exports = model('Usuario', UsuarioSchema); //* Exportacion del Esquema Usuario: 'UsuarioSchema'