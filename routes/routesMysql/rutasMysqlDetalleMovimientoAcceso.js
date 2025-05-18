const { Router } = require('express');
const { detallemovimientomysqlGet, detallemovimientomysqlPost, detallemovimientomysqlPut, detallemovimientomysqlDelete, detallemovimientosmysqlGet } = require('../../controllers/controllersMysql/controllersMysqlDetalleMovimientosAcceso');



const RutaDetalleMovimientoMysql = Router();

            RutaDetalleMovimientoMysql.get('/',   detallemovimientosmysqlGet)

            RutaDetalleMovimientoMysql.get('/:id',detallemovimientomysqlGet)

            RutaDetalleMovimientoMysql.post('/',  detallemovimientomysqlPost)

            RutaDetalleMovimientoMysql.put('/:id',detallemovimientomysqlPut )

            RutaDetalleMovimientoMysql.delete('/:id', detallemovimientomysqlDelete)

module.exports = RutaDetalleMovimientoMysql;