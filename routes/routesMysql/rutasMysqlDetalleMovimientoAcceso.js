const { Router } = require('express');
const { detallemovimientomysqlGet, detallemovimientomysqlPost, detallemovimientomysqlPut, detallemovimientomysqlDelete, detallemovimientosmysqlGet } = require('../../controllers/controllersMysql/controllersMysqlDetalleMovimientosAcceso');
const { check } = require('express-validator');
const { validarCampos, verificacionDeFecha } = require('../../middlewares/validar-campos');
const { existeIdDetalleMovimientoMysql } = require('../../middlewares/middelewareMysql/verificacionDeDatos');


const RutaDetalleMovimientoMysql = Router();

            RutaDetalleMovimientoMysql.get('/',   detallemovimientosmysqlGet)

            RutaDetalleMovimientoMysql.get('/:id',[existeIdDetalleMovimientoMysql],detallemovimientomysqlGet)

            RutaDetalleMovimientoMysql.post('/', [
                    check('idusuario', 'El idusuario es obligatorio').not().isEmpty(),
                    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
                    check('idemployee', 'El idemployee es obligatorio').not().isEmpty(),
                    check('fname', 'El fname es obligatorio').not().isEmpty(),
                    check('num_comprobante', 'El num_comprobante es obligatorio').not().isEmpty(),
                    check('fechainicio', 'La fechainicio es obligatoria').not().isEmpty(),
                    check('fechafin', 'La fechafin es obligatoria').not().isEmpty(),
                    check('tipomovimiento', 'El tipomovimiento es obligatorio').not().isEmpty(),
                    verificacionDeFecha,
                //check('fechaactual', 'La fechaactual es obligatoria').not().isEmpty(),
                    validarCampos // <- Este revisa los errores acumulados
            ] ,detallemovimientomysqlPost)

            RutaDetalleMovimientoMysql.put('/:id',[
                  verificacionDeFecha,
                  existeIdDetalleMovimientoMysql
            ],detallemovimientomysqlPut )

            RutaDetalleMovimientoMysql.delete('/:id', detallemovimientomysqlDelete)

module.exports = RutaDetalleMovimientoMysql;