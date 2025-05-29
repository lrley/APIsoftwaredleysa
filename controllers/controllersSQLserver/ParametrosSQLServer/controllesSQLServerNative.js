const {response, request}= require('express')
const { verificacionNumero } = require('../../../helpers/verificacionNumero');
const Native = require('../../../models/modelsSQLserver/modelsSQLServerParametros/nativeDBSqlServer');





const nativesGet = async(req= request, res= response) => {
   
    
    try {
        const datoBuscado =  await Native.findAll({order: [['native_id', 'ASC']]});
            return  res.status(500).json({
                    datoBuscado
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)    
    } 
       

}



const nativeGet= async(req= request, res= response) => {

 const {id} = req.params;
       try {
        verificacionNumero(id,8)

        const datoBuscado =  await Native.findOne({ where:{ native_id: verificacionNumero(id,3)} })
            if(!datoBuscado){
                return   res.status(400).json({
                    msg: `No existe este native_id ${verificacionNumero(id,3)}`    
        
            });
        }
        
        return  res.status(500).json({id,datoBuscado})
        
       } catch (error) {
        console.log(error);
        return  res.status(400).json(error) 
       } 
 

 
}



const nativePost = async(req = request, res = response) => {

    const {native_id, native_name} = req.body;
    
try {
        const datoBuscado= await Native.findOne({ where:{ native_id: verificacionNumero(native_id,3) } })    
                
                if(datoBuscado){
                  return  res.status(500).json({
                        msg:` El Id ${native_id} ya Existe en la base de datos `,
                        datoBuscado
                        });
                }

                const datoUpdate={
                          native_id:  verificacionNumero(native_id, 3),        
                        native_name:  native_name.toUpperCase().trim() ??  verificacionNumero(native_id, 3),      
                }

               const busquedaExistentes = await Native.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existedato = busquedaExistentes.some(dato => dato.native_name.toUpperCase().trim() === native_name.toUpperCase().trim());
                let coincidentes=''
                 if(existedato){
                    
                    coincidentes = busquedaExistentes.filter(dato => dato.native_name.toUpperCase().trim() === native_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidentes
                                  });
                 }
                    
                   const nuevoDato = await Native.create(datoUpdate);

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


const nativePut = async(req = request, res = response) => {
    const {id} = req.params;
    const {native_id, native_name} = req.body;
    
    // Convertir el ID del parámetro para búsqueda
    const idBusqueda = verificacionNumero(id, 3);

    if(idBusqueda!==native_id){
         return res.status(404).json({
            msg: `El native_id con ID ${verificacionNumero(id,3)} no es igual al native_id enviado:  ${native_id} `,
        });
    }

    // Buscar el departamento que se quiere actualizar usando el ID del parámetro
    const Existentedato = await Native.findOne({ where: { native_id: idBusqueda }});
    
    if (!Existentedato) {
        return res.status(404).json({
            msg: `El native_id con ID ${verificacionNumero(id,3)} no existe en la base de datos`,
        });
    }

    // Preparar datos para actualización
    
                const datoActualizador={
                          native_id:  verificacionNumero(native_id, 3),        
                        native_name:  native_name.toUpperCase().trim() ?? verificacionNumero(native_id, 3),      
                          
                }
 
                const busquedaExistentes = await Native.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeDato = busquedaExistentes.some(dato => dato.native_name.toUpperCase().trim() === native_name.toUpperCase().trim());
                let coincidencias=''
                 if(existeDato){
                    coincidencias = busquedaExistentes.filter(dato => dato.native_name.toUpperCase().trim() === native_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidencias
                                  });
                 }

    // Actualizar el departamento usando el ID original para la búsqueda
    const [numeroFilasActualizadas] = await Native.update(datoActualizador, {
        where: { native_id: datoActualizador.native_id }
    });
    

    return res.status(200).json({
        msg: "Estatus actualizado exitosamente",
        numeroFilasActualizadas,
        datoActualizador
        
    });
};


const nativeDelete = async(req = request, res = response) => {

  const {id}= req.params;
  
  try {

         const codigo = verificacionNumero(id,3);
         const busqueda = await Native.findOne({ where:{ native_id :  codigo  } })

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

nativesGet,
nativeGet,
nativePost,
nativePut,
nativeDelete,

}


