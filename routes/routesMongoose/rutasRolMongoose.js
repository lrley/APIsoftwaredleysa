const { Router } = require('express');

const { rolMongoosePost, rolMongooseDelete, rolMongooseGet, rolMongoosePut, rolsMongooseGet } = require('../../controllers/controllersMongoose/controllersMongooseRol');




const RutaRolMongoose = Router();

            RutaRolMongoose.get('/',        rolsMongooseGet  )
            RutaRolMongoose.get('/:id',     rolMongooseGet   )
            RutaRolMongoose.post('/',       rolMongoosePost   )
            RutaRolMongoose.put('/:id',     rolMongoosePut   )
            RutaRolMongoose.delete('/:id',  rolMongooseDelete )

module.exports = RutaRolMongoose;