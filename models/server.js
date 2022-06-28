//! Configuración del Servidor Express

const express = require('express')//* Importar framework 'Express'
const cors = require('cors');//* Importar cors module
const { dbConnection } = require('../database/config');//* Conexion a la base de datos

class Server { //? Clase

  constructor() { //? Atributos
    this.app = express();//* Haciendo uso de express
    this.port = process.env.PORT; //* el atributo 'port' toma el valor de la variable de entorno 'PORT'
    this.usuariosPath = '/api/usuarios'; //

    //? Conectar a la base de datos
    this.conectarDB();

    //? Middlewares
    this.middlewares();

    //? Rutas de mi aplicación
    this.routes();
  }

  //* Conexión a la base de datos
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {//? Método
    //? CORS
    this.app.use(cors()); //* CORS is a node. js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

    //? Lectura y parseo del body
    this.app.use(express.json());

    //? Directorio publico
    this.app.use(express.static('public'));//? Ruta '/'
  }

  routes() { //? Método // Rutas

    this.app.use(this.usuariosPath, require('../routes/usuarios'));

  }

  listen() { //? Método
    this.app.listen(this.port, () => {//! Establecer puerto server
      console.log('listening on port ' + this.port);
    })
  }

}

module.exports = Server;//* Se exporta el constructor o clase 'Server'