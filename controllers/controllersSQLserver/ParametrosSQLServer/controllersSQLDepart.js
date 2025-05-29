const {response, request}= require('express')



const Depart = require('../../../models/modelsSQLserver/modelsSQLServerParametros/departDBSqlServer');

const { verificacionNumero } = require('../../../helpers/verificacionNumero');



const departsGet = async(req= request, res= response) => {


    const {id}= req.params
    try {
        const departamentos =  await Depart.findAll();
            return  res.status(200).json({
                    departamentos
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)    
    }
    
  
}



const departGet= async(req= request, res= response) => {

 const {id} = req.params; 
 
       try {
        verificacionNumero(id,8)

        const departamento =  await Depart.findOne({ where:{ depart_id: verificacionNumero(id,8)} })
            if(!departamento){
                return   res.status(400).json({
                    msg: `No existe este depart_id ${verificacionNumero(id,3)}`    
        
            });
        }
        
        return   res.status(500).json({
            id,
            departamento
        });
  
       } catch (error) {
        console.log(error);
        return  res.status(400).json(error) 
       } 
 

 
}



const departPost = async(req = request, res = response) => {

    const {depart_id:codigo,upper_depart_id:departSuper,depart_name:nombreDepart,principal:detalle } = req.body;
    
try {
        const departamento= await Depart.findOne({ where:{ depart_id: verificacionNumero(codigo) } })    

                if(departamento){
                  return  res.status(500).json({
                        msg:` El Id ${codigo} ya Existe en la base de datos en otro departamento`,
                        departamento
                        });
                }

                const depart={
                          depart_id:  verificacionNumero(codigo, 8),        
                    upper_depart_id:  verificacionNumero(departSuper),      
                        depart_name:  nombreDepart.toUpperCase().trim() ?? "user",      
                          principal:  detalle.toUpperCase().trim() ?? "",      
                }

                busquedaDepartamentosExistentes = await Depart.findAll();
                
                // Verificar si el upper_depart_id existe en la base de datos
                // Solo validar si upper_depart_id no está vacío
                if (depart.upper_depart_id && depart.upper_depart_id.trim() !== "") {
                    const departamentoSuperiorExiste = busquedaDepartamentosExistentes.some(
                        dept => dept.depart_id === depart.upper_depart_id
                    );
                    
                    if (!departamentoSuperiorExiste) {
                        return res.status(400).json({
                            error: "No existe ese departamento Superior en la base de datos a continuacion muestro todos los dptos",
                            busquedaDepartamentosExistentes
                        });
                    }
                }

                   const nuevoDepartamento = await Depart.create(depart);

                     return   res.status(200).json({
                            nuevoDepartamento
                            
                        });
    
} catch (error) {
    console.log(error);
    return res.status(400).json({
        msg: 'Error al actualizar el departamento'
    })
}


}


const departPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {depart_id: codigo, upper_depart_id: departSuper, depart_name: nombreDepart, principal: detalle} = req.body;
    
    // Convertir el ID del parámetro para búsqueda
    const idBusqueda = verificacionNumero(id, 8);

    if(idBusqueda!==codigo){
         return res.status(404).json({
            msg: `El departamento con ID ${id} no es igual al Departamento con codigo ${codigo} `,
        });
    }
    
    // Buscar el departamento que se quiere actualizar usando el ID del parámetro
    const departamentoExistente = await Depart.findOne({ where: { depart_id: idBusqueda }});
    
    if (!departamentoExistente) {
        return res.status(404).json({
            msg: `El departamento con ID ${id} no existe en la base de datos`,
        });
    }


              
    // Preparar datos para actualización
    const datosActualizacion = {
                      depart_id:  verificacionNumero(codigo, 8),        
                    upper_depart_id:  verificacionNumero(departSuper),      
                        depart_name:  nombreDepart.toUpperCase().trim() ?? "user",      
                          principal:  detalle.toUpperCase().trim() ?? "",      
    };
 
    if(datosActualizacion.upper_depart_id === departamentoExistente.depart_id){
         return res.status(500).json({
                    msg: `El Departamento Superior no puede tener el mismo numero que el codigo del Departamento`,
                });
    }

    // Verificar si el upper_depart_id existe en la base de datos (solo si se está actualizando)
    if (departSuper && datosActualizacion.upper_depart_id && datosActualizacion.upper_depart_id.trim() !== "") {
        
        const busquedaDepartamentosExistentes = await Depart.findAll();//llama a todo el listado de departamentos
        const departamentoSuperiorExiste = busquedaDepartamentosExistentes.some(dept => 
            dept.depart_id === datosActualizacion.upper_depart_id
        );

        console.log(departamentoSuperiorExiste);

            if (!departamentoSuperiorExiste) {
                        return res.status(400).json({
                            error: "No existe ese departamento Superior en la base de datos",
                            departamentosDisponibles: busquedaDepartamentosExistentes
                        });
                    }
    }
       
    // Actualizar el departamento usando el ID original para la búsqueda
    const [numeroFilasActualizadas] = await Depart.update(datosActualizacion, {
        where: { depart_id: departamentoExistente.depart_id }
    });
    
    console.log(numeroFilasActualizadas);
    if (numeroFilasActualizadas === 0) {
        return res.status(500).json({
            msg: "No se pudo actualizar el departamento"
        });
    }
    
    // Obtener el departamento actualizado
    const departamentoActualizado = await Depart.findOne({
        where: { depart_id: datosActualizacion.depart_id }
    });
    
    return res.status(200).json({
        msg: "Departamento actualizado exitosamente",
        departamentoActualizado
    });
};




const departDelete = async(req = request, res = response) => {

  const {id}= req.params;
  
        const codigo = verificacionNumero(id,8);
        const departamento = await Depart.findOne({ where:{ depart_id :  codigo  } })

        if(!departamento){
            return   res.status(500).json({
                id,
                msg: `No existe el codigo ${codigo} de Departamento para ser eliminado.. `
            });
        }
        else{

            if(codigo==='00000001'){return res.status(500).json({mesg:`El codigo Principal no puede ser eliminado hable con el administrador para cualquier duda`})} 
          
            const buscaDepartSuper= await Depart.findAll()
            const departamentoSuperiorExiste = buscaDepartSuper.some(dept => dept.upper_depart_id === codigo);
            
            if(departamentoSuperiorExiste){
                const Subdepart = buscaDepartSuper.filter(dep => dep.upper_depart_id.startsWith(codigo));
                return   res.status(400).json({
                    msg: `AL departamento con codigo: ${codigo} Se le han asignado los Subdepartamentos Siguientes por eso no puede ser eliminado`,
                    Subdepart
                });
            }
            
            await departamento.destroy();

        }

                return   res.status(200).json({
                    msg: `Departamento Eliminado con exito`,
                });


}

module.exports= {

departsGet,
departGet,
departPost,
departPut,
departDelete


}


