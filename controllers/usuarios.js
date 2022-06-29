//! POST, GET, PUT, DELETE

const { response, request } = require('express');
const bcryptjs = require('bcryptjs');//! ENCRIPTA CONTRASENAS

const Usuario = require('../models/usuario'); //* Importar Modelo de la base de datos

const usuariosGet = async (req = request, res = response) => {//? GET

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true }

  //^ const 'usuario' y 'total' son codigos bloqueante, por ende hasta que no se termine de ejecutar 'usuarios' no pasara a la siguiente promesa 'total'
  // const usuarios = await Usuario.find(query) //* Obtener los usuarios, condición que el 'estado' este en 'true'
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query); //? Numero de Documentos guardados en la base de datos, con condicion

  //^ Solucionando el problema de arriba, se crea una coleccion de promesas para que se ejecutan al mismo tiempo, esto le tomare menos tiempo al servidor mostrar una respuesta al clietne
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query), //? Numero de Documentos guardados en la base de datos, con condicion
    Usuario.find(query) //* Obtener los usuarios, condición que el 'estado' este en 'true'
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  res.json({
    total, usuarios
    // total, usuarios
  })
}

//* Creates a new user
const usuariosPost = async (req, res = response) => {//? POST

  const { nombre, correo, password, rol } = req.body; //* Extrae datos en el body
  const usuario = new Usuario({ nombre, correo, password, rol });//* Creado Instancia, constructor 'Usuarios'

  //* Encriptar contrasena
  const salt = bcryptjs.genSaltSync();//! default value: 10
  usuario.password = bcryptjs.hashSync(password, salt)//* Encripta Contrasena

  //* Saved data in DB
  await usuario.save();

  //* 'res' Print the data that was saved in DB
  res.json({
    usuario
  })
}

//* Updates user data
const usuariosPut = async (req, res) => {//? PUT

  const { id } = req.params; //* Extraer argumento dado en el URL
  const { _id, password, google, correo, ...resto } = req.body;//* Extrae datos, "resto" no contendrá 'password' and 'google'. 

  // TODO: Validar contra base de datos
  if (password) {
    //* Encriptar contrase;a
    const salt = bcryptjs.genSaltSync();//! default value: 10 in 'genSaltSync'
    resto.password = bcryptjs.hashSync(password, salt)//* Encripta Contrase;a
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto); //* Busca el usuario por ID y Actualizalo

  res.json(usuario)
}

const usuariosPatch = (req, res) => {//? Patch


  res.json({
    message: 'patch API - controlador'
  })
}

const usuariosDelete = async (req, res) => {//? DELETE

  const { id } = req.params;

  const uid = req.uid;

  //^ Fisicamente borramos el usuario, pero no se tiene que hacer eso
  // const usuario = await Usuario.findByIdAndDelete(id); //* Encuentra el usuario y lo elimina

  //^ No elimina el usuario, solo cambia su 'estado' para que el la solicitud 'GET' no sea retornado
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({usuario});
}


module.exports = { usuariosGet, usuariosDelete, usuariosPatch, usuariosPost, usuariosPut };