const {response, request}= require('express')
const Employee = require('../../models/modelsSQLserver/employeeDBSqlserver');
const { verificacionNumero } = require('../../helpers/verificacionNumero');
const path = require('path');
const fs = require('fs');



const empoyeesGet = async(req= request, res= response) => {
      
    try {
        const employees = await Employee.findAll();
        res.status(400).json(employees)

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
try {
  console.log(body);
  
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
      emp_name:       req.body.emp_name ?? "user",      //nombre en biometrico 20 caracteres
      id_card:        req.body.id_card ?? "",        //cedula 10 caracteres
      depart_id:      verificacionNumero(req.body.depart_id, 8) ?? "00000001",  //8 caracteres     verificacionNumero(req.body.depart_id, 8);
      job_id:         verificacionNumero(req.body.job_id, 3) ?? "001",       //3 caracteres        verificacionNumero(req.body.job_id, 3); 
      edu_id:         verificacionNumero(req.body.edu_id, 3) ?? "001",       //3 caracteres        verificacionNumero(req.body.edu_id, 3);
      native_id:      verificacionNumero(req.body.native_id, 3) ?? "001",       //3 caracteres     verificacionNumero(req.body.native_id, 3);
      nation_id:      verificacionNumero(req.body.nation_id, 3) ?? "001",       //3 caracteres     verificacionNumero(req.body.nation_id, 3);
      status_id:      verificacionNumero(req.body.status_id, 3) ?? "001",       //3 caracteres     verificacionNumero(req.body.status_id, 3);
      polity_id:      verificacionNumero(req.body.polity_id, 3) ?? "001",       //3 caracteres     verificacionNumero(req.body.polity_id, 3);
      position_id:    verificacionNumero( req.body.position_id, 3) ?? "001",       //3 caracteres   verificacionNumero( req.body.position_id, 3);
      gd_school:      req.body.gd_school ?? "",        // "2025/05/12 23:39:26" placa
      gd_date:        fechasFormateadas.gd_date,      // Usar la fecha formateada correctamente
      speciality:     req.body.speciality ?? null,        // numero factura
      birth_date:     fechasFormateadas.birth_date,   // Usar la fecha formateada correctamente
      hire_date:      fechasFormateadas.hire_date,    // Usar la fecha formateada correctamente
      sex:            req.body.sex ?? null,        //sexo
      marriage:       req.body.marriage ?? null,        //estado casado o soltero 0 o 1
      email:          req.body.email ?? null,        //email
      phone_code:     req.body.phone_code ?? null,        //celular
      address:        req.body.address ?? null,        //direccion
      post_code:      req.body.post_code ?? "",          //codigo postal 8 digitos nvarchar
      ClockMsg:       req.body.ClockMsg ?? "",          //clave de biometrico
     // photo:          req.body.photo ?? Buffer.from([0x00]),        //foto
      memo:           req.body.memo ?? null,        //observacion
      card_sn:        verificacionNumero(req.body.card_sn, 10) ?? "",          //10 caracteres tag o tarjeta  verificacionNumero(req.body.card_sn, 10);
      end_date:       fechasFormateadas.end_date,     // Usar la fecha formateada correctamente
      f_name:         req.body.f_name ?? null         // nombres y apellidos                   
    };
  
    const nuevoEmpleado = await Employee.create(data);
    
    res.status(201).json({
      mensaje: 'Cliente creado correctamente',
      empleado: nuevoEmpleado
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






// Exportamos la función putUser
const employeePut = async (req= request, res= response) => {
  const { id } = req.params;
        const { body } = req;
        
        console.log(req.files);
   /*
    try {
        const { id } = req.params;
        const { body } = req;
        
        console.log(req.files);
        
        // Verificamos si se envió algún archivo o específicamente una foto
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.photo) {
            return res.status(400).json('No se ha enviado foto.');
        }
        
        const { photo } = req.files;
        
        // Verificar que estamos trabajando con rutas absolutas
        const rootDir = path.resolve(process.cwd());
        console.log(`Directorio raíz: ${rootDir}`);
        
        // Crear una ruta absoluta para el directorio de uploads
        const uploadsDir = path.join(rootDir, 'uploads');
        console.log(`Directorio de uploads: ${uploadsDir}`);
        
        // Verificar si existe algo en la ruta del directorio
        if (fs.existsSync(uploadsDir)) {
            const stats = fs.statSync(uploadsDir);
            // Si existe pero no es un directorio, eliminar el archivo
            if (!stats.isDirectory()) {
                fs.unlinkSync(uploadsDir);
                fs.mkdirSync(uploadsDir);
                console.log(`Se eliminó un archivo y se creó el directorio: ${uploadsDir}`);
            }
        } else {
            // Crear el directorio si no existe
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log(`Directorio creado: ${uploadsDir}`);
        }
        
        // Sanitizar el nombre del archivo
        const fileName = photo.name.replace(/\s+/g, '_');
        const uploadPath = path.join(uploadsDir, fileName);
        console.log(`Ruta de guardado: ${uploadPath}`);
        
        // SEGUNDA UBICACIÓN: CONFIGURACIÓN
        const secondaryDir = 'C:\\AttendanceSqlFFS\\image';
        
        // Verificar/crear el directorio secundario
        if (!fs.existsSync(secondaryDir)) {
            fs.mkdirSync(secondaryDir, { recursive: true });
            console.log(`Directorio secundario creado: ${secondaryDir}`);
        }
        
        const secondaryPath = path.join(secondaryDir, fileName);
        console.log(`Ruta secundaria de guardado: ${secondaryPath}`);
        
        // Guardar el archivo
        photo.mv(uploadPath, async (err) => {
            if (err) {
                console.log('Error al mover el archivo a la ruta principal:', err);
                return res.status(500).json({ msg: `Error al cargar la imagen en la ruta principal`, err });
            }
            
            try {
                // Leer el archivo que acabamos de guardar
                const fileContent = fs.readFileSync(uploadPath);
                
                // Guardar una copia en la segunda ubicación
                fs.writeFileSync(secondaryPath, fileContent);
                console.log(`Imagen duplicada en ruta secundaria: ${secondaryPath}`);
                
                res.json({
                    msg: 'Imagen subida con éxito a ambas ubicaciones',
                    primaryPath: uploadPath,
                    secondaryPath: secondaryPath,
                    fileName
                });
            } catch (copyError) {
                console.error('Error al duplicar la imagen:', copyError);
                
                // Si hay error al duplicar, al menos notificamos que se guardó en la ubicación principal
                res.json({
                    msg: 'Imagen guardada en ubicación principal, pero hubo un error al duplicarla',
                    primaryPath: uploadPath,
                    error: copyError.message,
                    fileName
                });
            }
        });
    
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ msg: 'Error en el servidor', error });
    }
        */
}


const employeeDelete = (req, res) => {


    res.send('Deltete empleado')
            
}

module.exports= {

empoyeesGet,
employeeGet,
employeePost,
employeePut,
employeeDelete


}