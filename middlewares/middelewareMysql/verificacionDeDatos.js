// middlewares/validarCamposRequeridos.js

const { request, response } = require('express');

/**
 * Middleware que valida la presencia de campos requeridos en req.body.
 * @param {Array<string>} camposRequeridos - Lista de campos que deben estar presentes.
 */
const validarCamposRequeridos = (camposRequeridos = []) => {
    return (req = request, res = response, next) => {
        const body = req.body;

        const camposFaltantes = camposRequeridos.filter(campo =>
            body[campo] === undefined || body[campo] === null || body[campo] === ''
        );

        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                msg: 'Faltan campos obligatorios',
                camposFaltantes
            });
        }

        next();
    };
};


const existeIdDetalleMovimientoMysql = async(req=request,res=response,next)=>{
    const {id} = req.params

        if(!id){
            return res.status(400).json({msg: `Debe ingresar un ID para realizar la busqueda`});
        }

    const movimiento= await Detallemovimientosacceso.findByPk(id)

        if(!movimiento){
            return res.status(400).json({msg: `no existe el detalle de movimiento ${id} ingresado`});
        }
        
        next();

}


module.exports = {
    validarCamposRequeridos,
    existeIdDetalleMovimientoMysql
};


//esto hiria en la ruta
/* const { validarCamposRequeridos } = require('../middlewares/validarCamposRequeridos');
RutaDetalleMovimientoMysql.put('/:id', [
    validarCamposRequeridos(['fechainicio', 'fechafin', 'idusuario']),
    existeIdDetalleMovimientoMysql,
    validarCampos
], detallemovimientomysqlPut); */