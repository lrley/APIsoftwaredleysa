const {response, request}= require('express')
const { verificacionNumero } = require('../../../helpers/verificacionNumero');

const Status = require('../../../models/modelsSQLserver/modelsSQLServerParametros/status.DBSqlServer');



const StatussGet = async(req= request, res= response) => {
    try {
        const status =  await Status.findAll({order: [['status_id', 'ASC']]});
            return  res.status(500).json({
                    status
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)    
    }
}



const StatusGet= async(req= request, res= response) => {

 const {id} = req.params;
       try {
        verificacionNumero(id,8)

        const status =  await Status.findOne({ where:{ status_id: verificacionNumero(id,3)} })
            if(!status){
                return   res.status(400).json({
                    msg: `No existe este status_id ${verificacionNumero(id,3)}`    
        
            });
        }
        
        return   res.status(500).json({
            id,
            status
        });
  
       } catch (error) {
        console.log(error);
        return  res.status(400).json(error) 
       } 
 

 
}



const StatusPost = async(req = request, res = response) => {

    const {status_id, status_name} = req.body;
    
try {
        const status= await Status.findOne({ where:{ status_id: verificacionNumero(status_id,3) } })    
                
                if(status){
                  return  res.status(500).json({
                        msg:` El Id ${status_id} ya Existe en la base de datos `,
                        status
                        });
                }

                const statusPost={
                          status_id:  verificacionNumero(status_id, 3),        
                        status_name:  status_name.toUpperCase().trim() ??  verificacionNumero(status_id, 3),      
                          
                }

                busquedaStatusExistentes = await Status.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeStatus = busquedaStatusExistentes.some(dato => dato.status_name.toUpperCase().trim() === status_name.toUpperCase().trim());
                let statusCoincidentes=''
                 if(existeStatus){
                    
                    statusCoincidentes = busquedaStatusExistentes.filter(dato => dato.status_name.toUpperCase().trim() === status_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   statusCoincidentes
                                  });
                 }
                    
                   const nuevoStatus = await Status.create(statusPost);

                     return   res.status(200).json({
                        msg:`Nuevo Usuario registrado con exito`,
                            nuevoStatus
                            
                        });
    
} catch (error) {
    console.log(error);
    return res.status(400).json({
        msg: 'Error al actualizar el departamento'
    })
}


}


const StatusPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {status_id, status_name} = req.body;
    
    // Convertir el ID del parámetro para búsqueda
    const idBusqueda = verificacionNumero(id, 3);

    if(idBusqueda!==status_id){
         return res.status(404).json({
            msg: `El status_id con ID ${verificacionNumero(id,3)} no es igual al status_id enviado:  ${status_id} `,
        });
    }

    // Buscar el departamento que se quiere actualizar usando el ID del parámetro
    const statusExistente = await Status.findOne({ where: { status_id: idBusqueda }});
    
    if (!statusExistente) {
        return res.status(404).json({
            msg: `El status_id con ID ${verificacionNumero(id,3)} no existe en la base de datos`,
        });
    }

    // Preparar datos para actualización
    
                const status={
                          status_id:  verificacionNumero(status_id, 3),        
                        status_name:  status_name.toUpperCase().trim() ?? verificacionNumero(status_id, 3),      
                          
                }
 
               const  busquedaStatusExistentes = await Status.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeStatus = busquedaStatusExistentes.some(dato => dato.status_name.toUpperCase().trim() === status_name.toUpperCase().trim());
                let statusCoincidentes=''
                 if(existeStatus){
                    statusCoincidentes = busquedaStatusExistentes.filter(dato => dato.status_name.toUpperCase().trim() === status_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   statusCoincidentes
                                  });
                 }

    // Actualizar el departamento usando el ID original para la búsqueda
    const [numeroFilasActualizadas] = await Status.update(status, {
        where: { status_id: status.status_id }
    });
    

    return res.status(200).json({
        msg: "Estatus actualizado exitosamente",
        numeroFilasActualizadas,
        status
        
    });
};


const StatusDelete = async(req = request, res = response) => {

  const {id}= req.params;
  
  try {

         const codigo = verificacionNumero(id,3);
        const status = await Status.findOne({ where:{ status_id :  codigo  } })

        if(!status){
            return   res.status(500).json({
                id,
                msg: `No existe el status_id con codigo ${codigo} para ser eliminado.. `
            });
        }
       
            await status.destroy();

            return   res.status(200).json({
                  msg: `status_id Eliminado con exito`,
                  status
            });
    
  } catch (error) {
    console.log(error);  
    return   res.status(500).json({
                  msg: `Error al Eliminar`,
                  
            });
  }
   
}

module.exports= {

StatussGet,
StatusGet,
StatusPost,
StatusPut, 
StatusDelete,

}


