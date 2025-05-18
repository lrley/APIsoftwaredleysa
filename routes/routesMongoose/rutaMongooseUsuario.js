const { Router } = require('express');
const { UsuariosMongooseGet,UsuarioMongooseGet,UsuarioMongoosePost,UsuarioMongoosePut,UsuarioMongooseDelete, } = require('../../controllers/controllersMongoose/controllersMongooseUsuario');




const RutaUsuario = Router();

            RutaUsuario.get('/',       UsuariosMongooseGet   )
            RutaUsuario.get('/:id',    UsuarioMongooseGet    )
            RutaUsuario.post('/',      UsuarioMongoosePost   )
            RutaUsuario.put('/:id',    UsuarioMongoosePut    )
            RutaUsuario.delete('/:id', UsuarioMongooseDelete )

module.exports = RutaUsuario;