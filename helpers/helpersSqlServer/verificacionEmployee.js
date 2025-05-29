const {response, request}= require('express')
const Employee = require('../../models/modelsSQLserver/employeeDBSqlserver');


const verificaCedula = async(cedula)=>{

      console.log('cedula a actualizar: '+cedula);
      const empleado = await Employee.findOne({ where: { id_card: cedula } });
         if(!empleado) return false

       
        return empleado

}


const verificaCodigoUser = async(codigo)=>{

      console.log('!!!codigo a actualizar: '+codigo);
      const empleado = await Employee.findOne({ where: { card_id:  codigo} });
         if(!empleado) return false

       
        return empleado

}


const verificaRfidUser = async(rfid)=>{

      console.log('tarjeta a actualizar: '+rfid);
      const empleado = await Employee.findOne({ where: { card_sn:  rfid} });
         if(!empleado) return false

       
        return empleado

}


module.exports = {
    verificaCedula,
    verificaCodigoUser,
    verificaRfidUser
}