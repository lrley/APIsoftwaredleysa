const {response, request}= require('express')

const { verificacionNumero } = require('../../../helpers/verificacionNumero');
const Job = require('../../../models/modelsSQLserver/modelsSQLServerParametros/jobDBSqlServer');




const jobsGet = async(req= request, res= response) => {

    try {
        const job =  await Job.findAll({order: [['job_id', 'ASC']]});
            return  res.status(500).json({
                    job
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)    
    }
    
  
}



const jobGet= async(req= request, res= response) => {

 const {id} = req.params;
       try {
        verificacionNumero(id,8)

        const position =  await Job.findOne({ where:{ job_id: verificacionNumero(id,3)} })
         
        if(!position){
            return   res.status(400).json({
                msg: `No existe este job_id ${verificacionNumero(id,3)}`    
        });
  
        }
        
        
        return   res.status(500).json({
            id,
            position
        });
  
       } catch (error) {
        console.log(error);
        return  res.status(400).json(error) 
       } 
 

 
}



const jobPost = async(req = request, res = response) => {

    const {job_id, job_name} = req.body;
    
try {
        const position= await Job.findOne({ where:{ job_id: verificacionNumero(job_id,3) } })    
                
                if(position){
                  return  res.status(500).json({
                        msg:` El Id ${job_id} ya Existe en la base de datos `,
                        position
                        });
                }

               

                const job={
                          job_id:  verificacionNumero(job_id, 3),        
                        job_name:  job_name.toUpperCase().trim() ?? job_id,      
                          
                }

                busquedaJobExistentes = await Job.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeJob = busquedaJobExistentes.some(job => job.job_name.toUpperCase().trim() === job_name.toUpperCase().trim());
                let jobsCoincidentes=''
                 if(existeJob){
                    
                    jobsCoincidentes = busquedaJobExistentes.filter(job => job.job_name.toUpperCase().trim() === job_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   jobsCoincidentes
                                  });
                 }
                    
                   const nuevoJob = await Job.create(job);

                     return   res.status(200).json({
                        msg:`Nuevo Usuario registrado con exito`,
                            nuevoJob
                            
                        });
    
} catch (error) {
    console.log(error);
    return res.status(400).json({
        msg: 'Error al actualizar el departamento'
    })
}


}


const jobPut = async(req = request, res = response) => {
    const {id} = req.params;
   const {job_id, job_name} = req.body;
    
    // Convertir el ID del parámetro para búsqueda
    const idBusqueda = verificacionNumero(id, 3);

    if(idBusqueda!==job_id){
         return res.status(404).json({
            msg: `El Job_id con ID ${verificacionNumero(id,3)} no es igual al JOb_id enviado:  ${job_id} `,
        });
    }

       
    
    // Buscar el departamento que se quiere actualizar usando el ID del parámetro
    const jobExistente = await Job.findOne({ where: { job_id: idBusqueda }});
    
    if (!jobExistente) {
        return res.status(404).json({
            msg: `El job_id con ID ${verificacionNumero(id,3)} no existe en la base de datos`,
        });
    }

    // Preparar datos para actualización
    
                const job={
                          job_id:  verificacionNumero(job_id, 3),        
                        job_name:  job_name.toUpperCase().trim() ?? job_id,      
                          
                }
 
              const   busquedaJobExistentes = await Job.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeJob = busquedaJobExistentes.some(job => job.job_name.toUpperCase().trim() === job_name.toUpperCase().trim());
                let jobsCoincidentes=''
                 if(existeJob){
                    jobsCoincidentes = busquedaJobExistentes.filter(job => job.job_name.toUpperCase().trim() === job_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   jobsCoincidentes
                                  });
                 }

    // Actualizar el departamento usando el ID original para la búsqueda
    const [numeroFilasActualizadas] = await Job.update(job, {
        where: { job_id: job.job_id }
    });
    

    return res.status(200).json({
        msg: "Job actualizado exitosamente",
        numeroFilasActualizadas,
        job
        
    });
};


const jobDelete = async(req = request, res = response) => {

  const {id}= req.params;
  
  try {

         const codigo = verificacionNumero(id,3);
        const job = await Job.findOne({ where:{ job_id :  codigo  } })

        if(!job){
            return   res.status(500).json({
                id,
                msg: `No existe el job_id con codigo ${codigo} para ser eliminado.. `
            });
        }
       
            await job.destroy();

            return   res.status(200).json({
                  msg: `Job Eliminado con exito`,
                  job
            });
    
  } catch (error) {
    console.log(error);  
    return   res.status(500).json({
                  msg: `Error al Eliminar`,
                  job
            });
  }
   
}

module.exports= {

    jobGet,
    jobsGet,
    jobPut,
    jobPost,
    jobDelete,

}


