const { Router } = require('express');

const { rolMongoosePost, rolMongooseDelete, rolMongooseGet, rolMongoosePut, rolsMongooseGet } = require('../../controllers/controllersMongoose/controllersMongooseRol');
const { validarCampos } = require('../../middlewares/validar-campos');
const { existeRol } = require('../../middlewares/middelewareMongoose/validarDatosRol');
const { validarRol } = require('../../helpers/helpersMongoose/checksMongoose/cheksMongooseRol');




const RutaRolMongoose = Router();

            RutaRolMongoose.get('/',        rolsMongooseGet  )
            
            RutaRolMongoose.get('/:id',     rolMongooseGet   )
            
            RutaRolMongoose.post('/',[
                existeRol,
                validarRol,
                validarCampos,
            ],rolMongoosePost)

            RutaRolMongoose.put('/:id',     rolMongoosePut   )
            
            RutaRolMongoose.delete('/:id',  rolMongooseDelete )

module.exports = RutaRolMongoose;