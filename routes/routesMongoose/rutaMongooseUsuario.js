const { Router } = require('express');
const { UsuariosMongooseGet,UsuarioMongooseGet,UsuarioMongoosePost,UsuarioMongoosePut,UsuarioMongooseDelete, } = require('../../controllers/controllersMongoose/controllersMongooseUsuario');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { existeEmail } = require('../../middlewares/middelewareMongoose/validarDatosUsuario');
const { validarUsuarios } = require('../../helpers/helpersMongoose/checksMongoose/cheksMongooseUsuario');




const RutaUsuario = Router();

            RutaUsuario.get('/',       UsuariosMongooseGet   )
            RutaUsuario.get('/:id',    UsuarioMongooseGet    )
            
            RutaUsuario.post('/',   [
                
                validarUsuarios,
                validarCampos,
                existeEmail,

            ],UsuarioMongoosePost   )

            RutaUsuario.put('/:id',    UsuarioMongoosePut    )
            RutaUsuario.delete('/:id', UsuarioMongooseDelete )

module.exports = RutaUsuario;