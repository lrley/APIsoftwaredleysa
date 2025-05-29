

const { request, response } = require('express');
//const moment = require('moment-timezone');
const { Op } = require('sequelize');
const Employee = require('../../models/modelsSQLserver/employeeDBSqlserver');
const { verificacionNumero } = require('../../helpers/verificacionNumero');

const existeEmpIdEmployeeSqlServer = async(req=request,res=response,next)=>{
    const {id} = req.params
     const convertido=verificacionNumero(id, 8);
     console.log(convertido);

        if(!convertido){
            return res.status(400).json({msg: `Debe ingresar un ID para realizar la busqueda`});
        }

     const employee = await Employee.findOne({ where: { emp_id: convertido } })

        if(!employee){
            return res.status(400).json({msg: `no existe el Cliente con ID:  ${id} `});
        }
        
        next();

}


const validarSoloNumeros = async(req=request,res=response,next) => {
  const { emp_id, card_id, id_card, card_sn } = req.body;

  let verificacion =[];
  const soloNumeros = (valor) => /^\d+$/.test(valor);


  if (!soloNumeros(emp_id)) {
     
    verificacion.push(`El codigo de Usuario ingresado debe contener solo numeros no esto ${emp_id}`)
    //return res.status(400).json({ msg: 'emp_id codigo de Usuario debe contener solo números' });
  }

  if (!soloNumeros(card_id)) {
    verificacion.push(`El ID de Usuario ingresado debe contener solo numeros no esto ${card_id}`)
   // return res.status(400).json({ msg: 'card_id ID usuario debe contener solo números' });
  }

  if (!soloNumeros(id_card)) {
    verificacion.push(`La Cedula ingresada debe contener solo numeros no esto ${id_card}`)
   // return res.status(400).json({ msg: 'id_card cedula debe contener solo números' });
  }

    if (!soloNumeros(card_sn)) {
    verificacion.push(`El numero de tarjeta ingresada debe contener solo numeros no esto ${card_sn}`)
    //return res.status(400).json({ msg: 'card_sn numero tarjeta debe contener solo números' });
  }

  if(!soloNumeros(emp_id) || !soloNumeros(card_id) || !soloNumeros(id_card) || !soloNumeros(card_sn) ){
    
    return res.status(400).json({ verificacion });

  }

  next();
};



const busquedaEmpidEmployeeSqlServer = async(req=request,res=response,next)=>{
    const {emp_id,card_id,id_card,card_sn} =  req.body

        const convertido = verificacionNumero(emp_id, 8);
        const convertido2 = verificacionNumero(card_id, 10);
        const convertido3 = verificacionNumero(card_sn, 10);

        const employee = await Employee.findOne({ 
            //where:{ emp_id: convertido } 
              where: {
            [Op.or]: [
            { emp_id: convertido },
            { card_id: convertido2 },
            { id_card: id_card },
            { card_sn: convertido3 },
            ]
  }
        
        });


          let repetidos =[];

          

            if(employee){
          
                if(employee.emp_id===convertido) repetidos.push(`Codigo: ${employee.emp_id}, ya existe en la base de datos`)
                if(employee.card_id===convertido2) repetidos.push(`Id Usuario: ${employee.card_id}, ya existe en la base de datos`)
                if(employee.id_card===id_card) repetidos.push(`Cedula: ${employee.id_card}, ya existe en la base de datos`)
                if(employee.card_sn===convertido3) repetidos.push(`Numero Tarjeta: ${employee.card_sn} ya existe en la base de datos`)

                return res.status(400).json({
                   
                    repetidos
                })


            }
    

        next();
}


const verificacionDeFechaSqlServer = (req=request,res=response,next) => {
    const { gd_date, end_date,birth_date,hire_date } = req.body;

   /*  console.log('Fecha Fin:', end_date);
    console.log('Fecha Inicio:', gd_date); */

    // Reemplazar las barras por guiones (si las fechas vienen con barras)
    const normalizeDate = (fecha) => {
        return fecha ? fecha.replace(/\//g, '-') : fecha;
    };

    const fechaInicio = normalizeDate(gd_date);
    const fechaFin = normalizeDate(end_date);
    const cumpleanos = normalizeDate(birth_date);
    const inscripcion = normalizeDate(hire_date);

  /*   console.log('Fecha Inicio normalizada:', fechaInicio);
    console.log('Fecha Fin normalizada:', fechaFin); */

    // Validar el formato de las fechas (YYYY-MM-DD)
    const fechaValida = (fecha) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;  // Formato YYYY-MM-DD
        return regex.test(fecha);
    };

    // Verificar el formato
    if (!fechaValida(fechaInicio)) {
        return res.status(400).json({ msg: 'La Fecha de Inicio no tiene el formato válido (YYYY-MM-DD)' });
    }

    if (!fechaValida(fechaFin)) {
        return res.status(400).json({ msg: 'La Fecha Fin no tiene el formato válido (YYYY-MM-DD)' });
    }

     if (!fechaValida(cumpleanos)) {
        return res.status(400).json({ msg: 'La Fecha de Cumpleaños no tiene el formato válido (YYYY-MM-DD)' });
    }

     if (!fechaValida(inscripcion)) {
        return res.status(400).json({ msg: 'La Fecha de Creacion del Usuario no tiene el formato válido (YYYY-MM-DD)' });
    }


    // Convertir las fechas a objetos Date
    const fechaInit = new Date(fechaInicio);
    const fechaEnd = new Date(fechaFin);
    const cumple= new Date(cumpleanos);
    const activacion = new Date(inscripcion)

    // Verificar si las fechas son válidas
    if (isNaN(fechaInit.getTime())) {
        return res.status(400).json({ msg: 'La Fecha de Inicio no es una fecha válida' });
    }

    if (isNaN(fechaEnd.getTime())) {
        return res.status(400).json({ msg: 'La Fecha Fin no es una fecha válida' });
    }

     if (isNaN(cumple.getTime())) {
        return res.status(400).json({ msg: 'La Fecha de Cumpleaños no es una fecha válida' });
    }

     if (isNaN(activacion.getTime())) {
        return res.status(400).json({ msg: 'La Fecha de creacion del Usuario no es una fecha válida' });
    }



    // Validar que la fecha de inicio no sea posterior a la fecha de fin
    if (fechaInit > fechaEnd) {
        return res.status(400).json({ msg: 'La Fecha de Inicio no puede ser posterior a la Fecha Fin' });
    }

    next();
};




module.exports= {
    existeEmpIdEmployeeSqlServer,
    busquedaEmpidEmployeeSqlServer,
    verificacionDeFechaSqlServer,
    validarSoloNumeros,
    
}