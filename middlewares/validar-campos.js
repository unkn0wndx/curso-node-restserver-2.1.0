//! Validar Campos
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

  const errors = validationResult(req);//* Si ocurrio un error en 'routes/usuarios' sera retornado en 'req', para su validation

  if(!errors.isEmpty()){ //* Si 'req' contiene un error, se informara
    return res.status(404).json(errors) 
  }

  next(); //* Pasa al siguiente middlewares, al final ejecutara la solicitud de 'post'
}


module.exports = {validarCampos}