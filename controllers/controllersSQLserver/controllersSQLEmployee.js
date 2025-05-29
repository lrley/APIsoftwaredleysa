const {response, request}= require('express')
const fileUpload = require('express-fileupload');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
//const { trim } = require('validator');
const { verificacionNumero } = require('../../helpers/verificacionNumero');
const { cargaDeImagenes } = require('../../helpers/cargaDeImagen');
const { verificaCedula, verificaCodigoUser, verificaRfidUser } = require('../../helpers/helpersSqlServer/verificacionEmployee');


const TblzEnrollDFace = require('../../models/modelsSQLserver/modelsSQLServerEnroladores/tblzEnrollDFace_DBSqlServer');
const TblzEnrollFace = require('../../models/modelsSQLserver/modelsSQLServerEnroladores/tblzEnrollFace_DBSqlServer');
const TblzEnroll = require('../../models/modelsSQLserver/modelsSQLServerEnroladores/tblzEnroll_DBSqlServer');
const Employee = require('../../models/modelsSQLserver/employeeDBSqlserver');


const empoyeesGet = async(req= request, res= response) => {
      const {departamento}= req.query
      const depart= verificacionNumero(departamento,8)
      console.log(depart);
      try {

      if(!departamento){
        const employees = await Employee.findAll();
        res.status(200).json(employees)
      }
        
      else{
          
        const employees = await Employee.findAll({
            where: {
                      depart_id: depart
            }
          });

                 
          
          res.status(200).json({
          total: employees.length,
          employees
          })
      }

    } catch (error) {
        console.error(error);
            res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuarios. Contacte al administrador'
        });
    }


    
}



const employeeGet= async(req= request, res= response) => {

 const {id} = req.params;
  try {
      console.log(verificacionNumero(id));
    
      const convertido=verificacionNumero(id, 8);
      if(convertido){
                const empleado = await Employee.findOne({ where: { emp_id: convertido } })
                //console.log(empleado);
                if(!empleado){
                    return res.status(500).json({
                        msg: `Cliente con Codigo: ${id} no encontrado en la base de datos`
                    })
                }
                res.json({
                    empleado
                })
      }else{
          return res.status(500).json({
              msg: `El Codigo ${id} ingresado no pertenece a un Empleado`
          })
      }
    
  } catch (error) {
    console.error(error);
            res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuarios. Contacte al administrador'
        });
  }

 
}

const employeePost = async(req = request, res = response) => {

    const { body } = req;
   // console.log(body);
try {
  
  // Buscar el empleado por ID
  const empleado = await Employee.findOne({ 
  where:{  [Op.or]: [
      { emp_id: body.emp_id },
      { id_card: body.id_card },
       { card_id: body.card_id},
      {card_sn:body.card_sn}
    ]} 
  });
   // console.log(body);
   // console.log(empleado);
    
    if (empleado) {
      return res.status(404).json({ msg: `Usuario ya existen cree un nuevo usuario que no exista` });
    }

  
  if(req.body.emp_id === null) {
    return res.status(400).json({ msg: `Falta algun dato de enviar revise por favor` });
  }
  
  // En lugar de crear una nueva instancia de Sequelize, usamos la que ya existe
  // a través del modelo Employee
  
  // Debido a que estamos teniendo problemas con la conversión de fechas,
  // vamos a tratar las fechas de una manera diferente
  let fechasFormateadas = {}; // Ya no necesitamos tipado
  
  try {
    // Convertir las fechas a objetos Date con formato específico
    const gd_date = req.body.gd_date ? new Date(req.body.gd_date.replace(/\//g, '-')) : new Date('2025-01-01');
    const birth_date = req.body.birth_date ? new Date(req.body.birth_date) : new Date('2025-01-01');
    const hire_date = req.body.hire_date ? new Date(req.body.hire_date) : new Date('2025-01-01');
    const end_date = req.body.end_date ? new Date(req.body.end_date) : new Date('2025-01-01');
    
    // Para uso en mensajes de error si es necesario
    fechasFormateadas = {
      gd_date: gd_date.toISOString().split('T')[0], // Formato 'YYYY-MM-DD'
      birth_date: birth_date.toISOString().split('T')[0],
      hire_date: hire_date.toISOString().split('T')[0],
      end_date: end_date.toISOString().split('T')[0]
    };
  
    //toUpperCase().trim().substring(0, 70)
    // Toma todos los valores del body y les asigna null si no vienen
    const data = {
      no_sign:        req.body.no_sign ?? 0,           //0
      card_id1:       req.body.card_id1 ?? null,        //null       
      rule_id:        req.body.rule_id ?? "",          //vacio
      dorm_id:        req.body.dorm_id ?? "",          //vacio
      /* 
      //cardlb:         req.body.cardlb ??       0,           //sin importacia
      //chkjine:        req.body.chkjine ??      0.00,        //sin importacia
      //qkjine:         req.body.qkjine ??       0.00,        //sin importacia
      //btjine:         req.body.btjine ??       0.00,        //sin importacia
      //xfjine:         req.body.xfjine ??       0.00,        //sin importacia  
      //cardlast:       req.body.cardlast ??     0.00,        //sin importacia    
      //cardxfcs:       req.body.cardxfcs ??     0,           //sin importacia
      //yajin:          req.body.yajin ??        0.00,        //sin importacia  
      //fakarq:         req.body.fakarq ??       null,        //sin importacia  
      //fakasj:         req.body.fakasj ??       null,        //sin importacia  
      //fakasize:       req.body.fakasize ??     0,           //sin importacia    
      //chlrq:          req.body.chlrq ??        null,        //sin importacia            
      //chlsize:        req.body.chlsize ??      0,           //sin importacia                  
      //guarq:          req.body.guarq ??        null,        //sin importacia                
      //guasj:          req.body.guasj ??        null,        //sin importacia                
      //guasize:        req.body.guasize ??      0,           //sin importacia            
      //card_pass:      req.body.card_pass ??    null,        //sin importacia              
      //opter:          req.body.opter ??        null,        //sin importacia            
       */
      emp_id:         verificacionNumero(req.body.emp_id, 8) ?? null,        //8 caracteres    verificacionNumero(req.body.emp_id, 8);
      card_id:        verificacionNumero(req.body.card_id, 10) ?? null,        //10 caracteres  verificacionNumero(req.body.card_id, 10);
      emp_name:       req.body.emp_name.toUpperCase().trim().substring(0, 20) ?? "user",      //nombre en biometrico 20 caracteres
      id_card:        req.body.id_card ?? "",        //cedula 10 caracteres
      depart_id:      verificacionNumero(req.body.depart_id, 8) ?? "00000001",  //8 caracteres     verificacionNumero(req.body.depart_id, 8);
      job_id:         verificacionNumero(req.body.job_id, 3) ?? "001",       //3 caracteres        verificacionNumero(req.body.job_id, 3); 
      edu_id:         verificacionNumero(req.body.edu_id, 3) ?? "001",       //3 caracteres        verificacionNumero(req.body.edu_id, 3);
      native_id:      verificacionNumero(req.body.native_id, 3) ?? "001",       //3 caracteres     verificacionNumero(req.body.native_id, 3);
      nation_id:      verificacionNumero(req.body.nation_id, 3) ?? "001",       //3 caracteres     verificacionNumero(req.body.nation_id, 3);
      status_id:      verificacionNumero(req.body.status_id, 3) ?? "001",       //3 caracteres     verificacionNumero(req.body.status_id, 3);
      polity_id:      verificacionNumero(req.body.polity_id, 3) ?? "001",       //3 caracteres     verificacionNumero(req.body.polity_id, 3);
      position_id:    verificacionNumero( req.body.position_id, 3) ?? "001",       //3 caracteres   verificacionNumero( req.body.position_id, 3);
      gd_school:      req.body.gd_school.toUpperCase().trim().substring(0, 100) ?? "",        // "2025/05/12 23:39:26" placa
      gd_date:        fechasFormateadas.gd_date,      // Usar la fecha formateada correctamente
      speciality:     req.body.speciality.toUpperCase().trim().substring(0, 100) ?? null,        // numero factura
      birth_date:     fechasFormateadas.birth_date,   // Usar la fecha formateada correctamente
      hire_date:      fechasFormateadas.hire_date,    // Usar la fecha formateada correctamente
      sex:            req.body.sex ?? null,        //sexo
      marriage:       req.body.marriage ?? null,        //estado casado o soltero 0 o 1
      email:          req.body.email.toLowerCase().trim().substring(0,50) ?? null,        //email
      phone_code:     req.body.phone_code ?? null,        //celular
      address:        req.body.address.toUpperCase().trim().substring(0, 100) ?? null,        //direccion
      post_code:      req.body.post_code.substring(0, 8) ?? "",          //codigo postal 8 digitos nvarchar
      ClockMsg:       req.body.ClockMsg.substring(0, 4) ?? "",          //clave de biometrico
      //photo:          req.body.photo ?? Buffer.from([]),   //Buffer.from([0x00]),        //foto
      memo:           req.body.memo.toUpperCase().trim() ?? null,        //observacion
      card_sn:        verificacionNumero(req.body.card_sn, 10) ?? "",          //10 caracteres tag o tarjeta  verificacionNumero(req.body.card_sn, 10);
      end_date:       fechasFormateadas.end_date,     // Usar la fecha formateada correctamente
      f_name:         req.body.f_name.toUpperCase().trim().substring(0, 50) ?? null         // nombres y apellidos                   
    };
    const nuevoEmpleado = await Employee.create(data);
    
    let photoData = null;
   /*  if(req.body.photo){
      console.log('entro a req.body.photo');
      const codigoUserPhoto = verificacionNumero(id, 10);
      const imageBuffer = await cargaDeImagenes(req.files, codigoUserPhoto, 'jpg');
      if (imageBuffer) {
        photoData = imageBuffer;
       // console.log('foto: ',photoData);
      }else{console.log('no existe foto');}


      data.photo= photoData
    }
 */
   /*  console.log(data.photo); */
    
    let dataTblzEnrollDFaceClockMsg={}
      let nuevoTblzEnrollDFace,nuevoTblzEnroll,nuevoTblzEnrollFace =''

   for(let i = 0; i<3; i++){

     dataTblzEnrollDFaceClockMsg={
            EMachineNumber: parseInt(255),
            EnrollNumber:   parseInt(req.body.emp_id),
            UserName:       req.body.emp_name.toUpperCase().trim(),
            FingerNumber:   null,
            Privilege:      parseInt(0),
            Password:       null,
            Template:       null
      };
          
      if(i===0){
         dataTblzEnrollDFaceClockMsg.FingerNumber=  10;
         dataTblzEnrollDFaceClockMsg.Password= req.body.ClockMsg;
        
      }
      if(i===1){
         dataTblzEnrollDFaceClockMsg.FingerNumber=  11;
         dataTblzEnrollDFaceClockMsg.Password=  verificacionNumero(req.body.card_sn, 10);
        
      }
     
      if(i===2 && photoData ){
       
        dataTblzEnrollDFaceClockMsg.FingerNumber=  50;
         dataTblzEnrollDFaceClockMsg.Password=  null;
        
      }
      if(i<2 && !photoData){
       nuevoTblzEnrollDFace = await TblzEnrollDFace.create(dataTblzEnrollDFaceClockMsg)
        nuevoTblzEnroll= await TblzEnroll.create(dataTblzEnrollDFaceClockMsg)
       nuevoTblzEnrollFace = await TblzEnrollFace.create(dataTblzEnrollDFaceClockMsg)
      }
      if(i<3 && photoData){
       nuevoTblzEnrollDFace = await TblzEnrollDFace.create(dataTblzEnrollDFaceClockMsg)
       nuevoTblzEnroll= await TblzEnroll.create(dataTblzEnrollDFaceClockMsg)
       if(i<2){nuevoTblzEnrollFace = await TblzEnrollFace.create(dataTblzEnrollDFaceClockMsg)}


      }


   }
      
    res.status(201).json({
      mensaje: 'Cliente creado correctamente',
      empleado: nuevoEmpleado,
    });



  } catch (innerError) {
    // Este bloque maneja los errores específicos de la creación del empleado
    console.error("Error al crear el empleado:", innerError);
    
    // Verificar si es un error de conversión de fecha
    if (innerError.name === 'SequelizeDatabaseError' && 
        innerError.parent && 
        innerError.parent.number === 241 && 
        innerError.message.includes('date')) {
      return res.status(400).json({
        msg: 'Error en el formato de las fechas. Por favor verifica los formatos de fecha enviados.',
        detalles: fechasFormateadas
      });
    }
    
    // Re-lanzar el error para que sea capturado por el catch exterior
    throw innerError;
  }
} catch (error) {
  // Este bloque maneja todos los demás errores
  console.error("Error completo:", error);
  
  res.status(500).json({
    msg: 'Error al Crear usuario. Contacte al administrador'
  });
}


  


}


const employeePut = async (req = request, res = response) => {
  const { id } = req.params; // emp_id que se va a actualizar
  const { body } = req;

  try {
    if (!id) {
      return res.status(400).json({ msg: "Debe proporcionar el ID del empleado a actualizar" });
    }


     const codigoUser = verificacionNumero(id, 8);
     
     const empIdEnviado= verificacionNumero(body.emp_id,8)
     //console.log(codigoUser);

  if (empIdEnviado!== codigoUser) {
    return res.status(500).json({
      msg: `El emp_id ${empIdEnviado} enviado por el frontEnd no es el mismo que el codigo a buscar ${codigoUser} `
    });
  }

   if (!codigoUser) {
    return res.status(500).json({
      msg: `El Código ${id} ingresado no es un número válido. Ingrese un Número Entero Válido`
    });
  }


    // Buscar el empleado por ID
     const empleado = await Employee.findOne({ where: { emp_id: codigoUser } });
    if (!empleado) {
      return res.status(404).json({ msg: `No se encontró un empleado con el ID ${id}` });
    }

    //verificamos si la cedula existe en otro usuario al actualizarla
    const cedEmployee= await verificaCedula(body.id_card)

    if(cedEmployee!==false){
      if(cedEmployee.emp_id !== empleado.emp_id){
        const {emp_id,f_name, id_card} = cedEmployee
        return res.json({
          msg:'Esta cedula ya existe en un Usuario.',
          Codigo: emp_id,
          Nombre: f_name,
          Cedula: id_card
        })
      }
    }

    //verificamos si el codigo de usuario existe en otro User al actualizarlo
    const codEmployee= await verificaCodigoUser(verificacionNumero(body.card_id,10))//aqui ya transforma el codigo enviado a 10 digitos
    if(codEmployee!==false){
      if(codEmployee.emp_id !== empleado.emp_id){
        return res.json({
          msg:'Este codigo ya existe en un Usuario.',
          codEmployee
        })
      }
    }


       //verificamos si el rfid de usuario existe en otro User al actualizarlo
    const rfidEmployee= await verificaRfidUser(verificacionNumero(body.card_sn,10))//aqui ya transforma el codigo enviado a 10 digitos
    if(rfidEmployee!==false){
      if(rfidEmployee.emp_id !== empleado.emp_id){
        return res.json({
          msg:'Esta tarjeta o tag ya existe en un Usuario.',
          rfidEmployee
        })
      }
    }

     let photoData = null;
      const codigoUserPhoto = verificacionNumero(id, 10);
      const imageBuffer = await cargaDeImagenes(req.files, codigoUserPhoto, 'jpg');
      if (imageBuffer) {
        photoData = imageBuffer;
       // console.log('foto: ',photoData);
      }else{console.log('no existe foto');}


    // Manejo de fechas con formato adecuado
    let fechasFormateadas = {};
    try {
      const gd_date = body.gd_date ? new Date(body.gd_date.replace(/\//g, '-')) : empleado.gd_date;
      const birth_date = body.birth_date ? new Date(body.birth_date) : empleado.birth_date;
      const hire_date = body.hire_date ? new Date(body.hire_date) : empleado.hire_date;
      const end_date = body.end_date ? new Date(body.end_date) : empleado.end_date;

      //console.log("Empleado:", empleado);
      //console.log("Fechas del body:", body.gd_date, body.birth_date, body.hire_date, body.end_date);

      fechasFormateadas = {
        gd_date: gd_date instanceof Date && !isNaN(gd_date) ? gd_date.toISOString().split('T')[0] : null,
        birth_date: birth_date instanceof Date && !isNaN(birth_date) ? birth_date.toISOString().split('T')[0] : null,
        hire_date: hire_date instanceof Date && !isNaN(hire_date) ? hire_date.toISOString().split('T')[0] : null,
        end_date: end_date instanceof Date && !isNaN(end_date) ? end_date.toISOString().split('T')[0] : null
      };

      
      

      // Actualización de campos (solo si vienen en el body)
      const data = {
        no_sign:        body.no_sign ?? empleado.no_sign,
        card_id1:       body.card_id1 ?? empleado.card_id1,
        rule_id:        body.rule_id ?? empleado.rule_id,
        dorm_id:        body.dorm_id ?? empleado.dorm_id,
        emp_id:         verificacionNumero(body.emp_id.substring(0,12), 8) ?? empleado.emp_id,
        card_id:        verificacionNumero(body.card_id.substring(0,16), 10) ?? empleado.card_id,
        emp_name:       body.emp_name.toUpperCase().trim().substring(0,20) ?? empleado.emp_name,
        id_card:        body.id_card.substring(0,20) ?? empleado.id_card,
        depart_id:      verificacionNumero(body.depart_id, 8) ?? empleado.depart_id,
        job_id:         verificacionNumero(body.job_id, 3) ?? empleado.job_id,
        edu_id:         verificacionNumero(body.edu_id, 3) ?? empleado.edu_id,
        native_id:      verificacionNumero(body.native_id, 3) ?? empleado.native_id,
        nation_id:      verificacionNumero(body.nation_id, 3) ?? empleado.nation_id,
        status_id:      verificacionNumero(body.status_id, 3) ?? empleado.status_id,
        polity_id:      verificacionNumero(body.polity_id, 3) ?? empleado.polity_id,
        position_id:    verificacionNumero(body.position_id, 3) ?? empleado.position_id,
        gd_school:      body.gd_school.toUpperCase().trim().substring(0,100) ?? empleado.gd_school,
        gd_date:        fechasFormateadas.gd_date,
        speciality:     body.speciality.toUpperCase().trim().substring(0,100) ?? empleado.speciality,
        birth_date:     fechasFormateadas.birth_date,
        hire_date:      fechasFormateadas.hire_date,
        sex:            body.sex ?? empleado.sex,
        marriage:       body.marriage ?? empleado.marriage,
        email:          body.email.toLowerCase().trim().substring(0,50) ?? empleado.email,
        phone_code:     body.phone_code.trim().substring(0,20) ?? empleado.phone_code,
        address:        body.address.toUpperCase().trim().substring(0,100) ?? empleado.address,
        post_code:      body.post_code.trim().substring(0,8) ?? empleado.post_code,
        ClockMsg:       body.ClockMsg.trim().substring(0,64) ?? empleado.ClockMsg,
        memo:           body.memo.toUpperCase().trim() ?? empleado.memo,
        card_sn:        verificacionNumero(body.card_sn.substring(0,10), 10) ?? empleado.card_sn,
        end_date:       fechasFormateadas.end_date,
        f_name:         body.f_name.toUpperCase().trim().substring(0,50) ?? empleado.f_name,
        photo:          photoData
      };
      
      let tblzEnrollDFace=''
       tblzEnrollDFace  = await TblzEnrollDFace.findOne({
           where: {
            EnrollNumber: parseInt(req.body.emp_id),
            FingerNumber: 50
           }
       })
    


    let dataTblzEnrollDFaceClockMsg={}


     dataTblzEnrollDFaceClockMsg={
            EMachineNumber: parseInt(255),
            EnrollNumber:   parseInt(req.body.emp_id),
            UserName:       req.body.emp_name.toUpperCase().trim(),
            FingerNumber:   50,
            Privilege:      parseInt(0),
            Password:       null,
            Template:       null
      };
     
      //Funcion de actualizacion de TblzEnrollDFace
    const actualizarEnrooler=async(baseEnrrolle)=>{
          // Actualiza Password 10 con ClockMsg 
          await baseEnrrolle.update(
            {
              UserName:  req.body.emp_name.toUpperCase().trim(),
              Password: body.ClockMsg.substring(0,64)
            },
            {
              where: {
                EnrollNumber: parseInt(req.body.emp_id),
                FingerNumber: 10
              }
            }
          );
          // Actualiza FingerNumber 11 con card_sn 
          await baseEnrrolle.update(
            {
              UserName:  req.body.emp_name.toUpperCase().trim(),
              Password:  verificacionNumero(body.card_sn.substring(0,50))
            },
            {
              where: {
                EnrollNumber: parseInt(req.body.emp_id),
                FingerNumber: 11
              }
            }
          );
    }

    if(!tblzEnrollDFace && photoData)      
     { 
        await TblzEnrollDFace.create(dataTblzEnrollDFaceClockMsg)
        await TblzEnroll.create(dataTblzEnrollDFaceClockMsg)
            actualizarEnrooler(TblzEnrollDFace)
            actualizarEnrooler(TblzEnroll);
            actualizarEnrooler(TblzEnrollFace);
     }else{
            actualizarEnrooler(TblzEnrollDFace)
            actualizarEnrooler(TblzEnroll);
            actualizarEnrooler(TblzEnrollFace);
     }

      // Actualizar en la base de datos
      await empleado.update(data);

      res.status(200).json({
        mensaje: 'Empleado actualizado correctamente',
        empleado
      });

    } catch (innerError) {
      if (innerError.name === 'SequelizeDatabaseError' &&
        innerError.parent &&
        innerError.parent.number === 241 &&
        innerError.message.includes('date')) {
        return res.status(400).json({
          msg: 'Error en el formato de las fechas. Por favor verifica los formatos de fecha enviados.',
          detalles: fechasFormateadas
        });
      }
      throw innerError;
    }

  } catch (error) {
    console.error("Error completo al actualizar:", error);
    res.status(500).json({
      msg: 'Error al actualizar empleado. Contacte al administrador.'
    });
  }
};


const employeeDelete = async(req = request, res = response) => {

  const {id}= req.params;
  
  
try {
     if (!id) {
      return res.status(400).json({ msg: "Debe proporcionar el ID del empleado a Eliminar" });
    }

   const codigoUser = verificacionNumero(id, 8);
     
   if (!codigoUser) {
        return res.status(500).json({
          msg: `El Código ${id} ingresado no es un número válido. Ingrese un Número Entero Válido`
        });
    }

    let deleteRespuesta = [];
    // Buscar el empleado por ID
    const empleado = await Employee.findOne({ where: { emp_id: codigoUser } });
    if (!empleado) {
         deleteRespuesta.push(`Usuario con codigo ${codigoUser} no existe`)
    }else{
      await empleado.destroy();
      deleteRespuesta.push(`Usuario Eliminado: ${empleado.f_name} `)
    }

      const tblzEnrollDFace  = await TblzEnrollDFace.findOne({where: {EnrollNumber: parseInt(codigoUser)}})
          if (!tblzEnrollDFace) {
            deleteRespuesta.push( `No se encontró un tblzEnrollDFace con el ID ${codigoUser}` ) 
          }else{
                await tblzEnrollDFace.destroy();
                deleteRespuesta.push(`tblzEnrollDFace con ID ${tblzEnrollDFace.EnrollNumber} ${tblzEnrollDFace.UserName} eliminado correctamente.`)
          }
      const tblzEnroll  = await TblzEnroll.findOne({where: {EnrollNumber: parseInt(codigoUser)}})
        if (!tblzEnroll) {
               deleteRespuesta.push( `No se encontró un TblzEnroll con el ID ${codigoUser}` ) 
          }else{
                await tblzEnroll.destroy();
                 deleteRespuesta.push(`tblzEnroll con ID ${tblzEnroll.EnrollNumber} ${tblzEnroll.UserName} eliminado correctamente.`)
          }
      const tblzEnrollFace  = await TblzEnrollFace.findOne({where: {EnrollNumber: parseInt(codigoUser)}})
        if (!tblzEnrollFace) {
           deleteRespuesta.push( `No se encontró un tblzEnrollFace con el ID ${codigoUser}` ) 
          }else{
                await tblzEnrollFace.destroy();
                     deleteRespuesta.push(`tblzEnrollFace con ID ${tblzEnrollFace.EnrollNumber} ${tblzEnrollFace.UserName} eliminado correctamente.`)
          }
return res.status(200).json({
  deleteRespuesta
})

} catch (error) {
  console.log(error);
      return res.status(500).json(`Error al Eliminar Cliente`);

}






}

module.exports= {

empoyeesGet,
employeeGet,
employeePost,
employeePut,
employeeDelete,



}


