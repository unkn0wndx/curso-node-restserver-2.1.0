//! Conexión a la base de datos

const mongoose = require('mongoose');
const colors = require('colors');

const dbConnection = async () => {//* Metodo para la Conexión de la base de datos

  try {//? Try catch 

    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, //! NO SOPORTADO EN VERSIONES RECIENTE DE PACKAGE 'mongoose'
      useFindAndModify: false //! NO SOPORTADO EN VERSIONES RECIENTE DE PACKAGE 'mongoose'
    });
    
    console.log(colors.bgGreen('Conexión Exitosa a la base de datos'));
  } catch (error) {
    throw new Error(`${colors.bgRed('Inicio de la base de datos Fallido')}
    ${colors.bgRed('ERROR ->')} ${error} ${colors.bgRed('<- ERROR')}`);
  }

}


module.exports = {dbConnection}