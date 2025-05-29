const {response, request}= require('express')
const { verificacionNumero } = require('../../../helpers/verificacionNumero');
const Education = require('../../../models/modelsSQLserver/modelsSQLServerParametros/educationDBSqlServer');




const educationssGet = async(req= request, res= response) => {
   
    
    try {
        const datoBuscado =  await Education.findAll({order: [['edu_id', 'ASC']]});
            return  res.status(500).json({
                    datoBuscado
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)    
    } 
       

}



const educationsGet= async(req= request, res= response) => {

 const {id} = req.params;
       try {
        verificacionNumero(id,8)

        const datoBuscado =  await Education.findOne({ where:{ edu_id: verificacionNumero(id,3)} })
            if(!datoBuscado){
                return   res.status(400).json({
                    msg: `No existe este status_id ${verificacionNumero(id,3)}`    
        
            });
        }
        
        return  res.status(500).json({id,datoBuscado})
        
       } catch (error) {
        console.log(error);
        return  res.status(400).json(error) 
       } 
 

 
}



const educationsPost = async(req = request, res = response) => {

    const {edu_id, education} = req.body;
    
try {
        const datoBuscado= await Education.findOne({ where:{ edu_id: verificacionNumero(edu_id,3) } })    
                
                if(datoBuscado){
                  return  res.status(500).json({
                        msg:` El Id ${edu_id} ya Existe en la base de datos `,
                        datoBuscado
                        });
                }

                const datoUpdate={
                          edu_id:  verificacionNumero(edu_id, 3),        
                        education:  education.toUpperCase().trim() ??  verificacionNumero(edu_id, 3),      
                }

               const busquedaExistentes = await Education.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existedato = busquedaExistentes.some(dato => dato.education.toUpperCase().trim() === education.toUpperCase().trim());
                let coincidentes=''
                 if(existedato){
                    
                    coincidentes = busquedaExistentes.filter(dato => dato.education.toUpperCase().trim() === education.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidentes
                                  });
                 }
                    
                   const nuevoDato = await Education.create(datoUpdate);

                     return   res.status(200).json({
                        msg:`Nuevo Usuario registrado con exito`,
                            nuevoDato
                            
                        });
    
} catch (error) {
    console.log(error);
    return res.status(400).json({
        msg: 'Error al actualizar el departamento'
    })
}


}


const educationsPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {edu_id, education} = req.body;
    
    // Convertir el ID del parámetro para búsqueda
    const idBusqueda = verificacionNumero(id, 3);

    if(idBusqueda!==edu_id){
         return res.status(404).json({
            msg: `El edu_id con ID ${verificacionNumero(id,3)} no es igual al status_id enviado:  ${edu_id} `,
        });
    }

    // Buscar el departamento que se quiere actualizar usando el ID del parámetro
    const Existentedato = await Education.findOne({ where: { edu_id: idBusqueda }});
    
    if (!Existentedato) {
        return res.status(404).json({
            msg: `El edu_id con ID ${verificacionNumero(id,3)} no existe en la base de datos`,
        });
    }

    // Preparar datos para actualización
    
                const datoActualizador={
                          edu_id:  verificacionNumero(edu_id, 3),        
                        education:  education.toUpperCase().trim() ?? verificacionNumero(edu_id, 3),      
                          
                }
 
                const busquedaExistentes = await Education.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeDato = busquedaExistentes.some(dato => dato.education.toUpperCase().trim() === education.toUpperCase().trim());
                let coincidencias=''
                 if(existeDato){
                    coincidencias = busquedaExistentes.filter(dato => dato.education.toUpperCase().trim() === education.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidencias
                                  });
                 }

    // Actualizar el departamento usando el ID original para la búsqueda
    const [numeroFilasActualizadas] = await Education.update(datoActualizador, {
        where: { edu_id: datoActualizador.edu_id }
    });
    

    return res.status(200).json({
        msg: "Estatus actualizado exitosamente",
        numeroFilasActualizadas,
        datoActualizador
        
    });
};


const educationsDelete = async(req = request, res = response) => {

  const {id}= req.params;
  
  try {

         const codigo = verificacionNumero(id,3);
         const busqueda = await Education.findOne({ where:{ edu_id :  codigo  } })

        if(!busqueda){
            return   res.status(500).json({
                id,
                msg: `No existe el status_id con codigo ${codigo} para ser eliminado.. `
            });
        }
       
            await busqueda.destroy();

            return   res.status(200).json({
                  msg: `status_id Eliminado con exito`,
                  busqueda
            });
    
  } catch (error) {
    console.log(error);  
    return   res.status(500).json({
                  msg: `Error al Eliminar`,
                  
            });
  }
   
}

module.exports= {

educationsGet,
educationssGet,
educationsPost,
educationsPut, 
educationsDelete,

}


