const { validationResult } = require('express-validator');
const {response, request}= require('express');
const Detallemovimientosacceso = require('../models/modelsMysql/detallemovimientosaccesoDBMysql');

const validarCampos=(req=request,res=response, next)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}




const verificacionDeFecha = (req=request,res=response,next)=>{

const {fechainicio,fechafin}= req.body
console.log(fechafin);
console.log(fechainicio);
const fechaInit= new Date(fechainicio)
const fechaEnd = new Date(fechafin)

            if (isNaN(fechaEnd.getTime())) {
                return res.status(400).json({msg:`La Fecha Fin no es una fecha válida`});
            }

            if (isNaN(fechaInit.getTime())) {
                return res.status(400).json({msg:`La Fecha de Inicio no es una fecha válida`});
            }

            
next();

}




module.exports={
validarCampos,
verificacionDeFecha
}
