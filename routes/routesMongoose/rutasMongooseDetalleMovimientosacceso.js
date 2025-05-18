const { Router } = require('express');
const { detallemovimientosMongooseGet, detallemovimientoMongooseGet, detallemovimientoMongoosePost, detallemovimientoMongoosePut, detallemovimientoMongooseDelete } = require('../../controllers/controllersMongoose/controllesMongooseDetalleMovimiento');




const RutaDetalleMovimientoMongoose = Router();

            RutaDetalleMovimientoMongoose.get('/', detallemovimientosMongooseGet  )

            RutaDetalleMovimientoMongoose.get('/:id',detallemovimientoMongooseGet)

            RutaDetalleMovimientoMongoose.post('/', detallemovimientoMongoosePost )

            RutaDetalleMovimientoMongoose.put('/:id', detallemovimientoMongoosePut)

            RutaDetalleMovimientoMongoose.delete('/:id', detallemovimientoMongooseDelete )

module.exports = RutaDetalleMovimientoMongoose;