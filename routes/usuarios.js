//! Se guardan las rutas (URLs)
const { Router } = require('express');
const { check } = require('express-validator'); //? Valida data

const { validarCampos } = require('../middlewares/validar-campos'); //* Modulo que valida la data
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators'); //* Validaciones Personalizadas

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();

//? Ruta GET
router.get('/', usuariosGet)

//? Ruta POST
//* The data is validated, before the post request is processed
router.post('/',
    [//* Valida los datos antes de hacer la solicitud 'POST'
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), //*Valida que haya un nombre
        check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }), //* Valida si la contrase;a mide mas 6 caracteres
        check('correo', 'El correo no es valido').isEmail(), //* Valida si el correo es valido
        check('correo').custom(emailExiste),//* Valida si el correo ya existe
        check('rol').custom(esRoleValido), //* Valida que el rol existe en la base de datos
        validarCampos //* Valida cada uno de los middlewares de arriba e informara del error
    ]
    , usuariosPost);//* Si pasa los middlewares de arriba se publicaran los datos en la base de datos

//? Ruta PUT
//* Update User
router.put('/:id', //* El 'id' dado en el url sera extraido y despues sera validado para hacer la solicitud 'PUT' (Update Data)
    [//* Valida los datos antes de hacer la solicitud 'PUT'
        check('id', 'No es un ID valido').isMongoId(), //* Valida si es un id de mongo
        check('id').custom(existeUsuarioPorID), //* Validación custom si el id existe en la base de datos
        check('rol').custom(esRoleValido), //* Valida que el rol existe en la base de datos
        validarCampos//* Valida cada uno de los middlewares de arriba e informara del error
    ]
    , usuariosPut) //* Si pasa los middlewares de arriba se actualizaran los datos en la base de datos

//? Ruta DELETE
router.delete('/:id',
    [
        check('id', 'No es un ID valido').isMongoId(), //* Valida si es un id de mongo
        check('id').custom(existeUsuarioPorID), //* Validación custom si el id existe en la base de datos
        validarCampos//* Valida cada uno de los middlewares de arriba e informara del error
    ]
    , usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;