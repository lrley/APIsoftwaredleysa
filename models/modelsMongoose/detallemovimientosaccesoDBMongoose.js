const {Schema, model} = require('mongoose');
const { type } = require('os');
const { fechaEcuador } = require('../../helpers/fechaActual');

const Detallemovimientosacceso = Shema({


    idUsuario:{
        type: String,
        required:[true,'El Idusuario es requerido'],
    },

    usuario:{
        type: String,
        required:[true,'El Idusuario es requerido'],
    },

    idemployee:{
    type:String,
    required: [true,'el IdEmployee es requerido'],
    },

    fname:{
    type:String,
    required: [true,'el fname es requerido'],
    },

    cedula:{
    type:String,
    required: [true,'La cedula es requerido'],
    },

    membresia:{
    type:String,
    required: [true,'el membresia es requerido'],
    },

    num_comprobante:{
    type:String,
    required: [true,'el num_comprobante es requerido'],
    },

    fecha_inicio:{
     type: Date,
        required: true,
    },

    fecha_fin:{
        type: Date,
        required: true,
    },

    tipoMovimiento:{
    type:String,
    required: [true,'el tipo es requerido'],
    },

    fecha_Actual:{
        type: Date,
        required: true,
        default: fechaEcuador(),
    },









});


module.exports= model('Detallemovimientosacceso',Detallemovimientosacceso)