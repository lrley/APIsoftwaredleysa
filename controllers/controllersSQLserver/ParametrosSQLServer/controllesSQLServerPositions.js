const {response, request}= require('express')
const { verificacionNumero } = require('../../../helpers/verificacionNumero');
const Positions = require('../../../models/modelsSQLserver/modelsSQLServerParametros/positiosDBSqlServer');






const positionssGet = async(req= request, res= response) => {
   
    
    try {
        const datoBuscado =  await Positions.findAll({order: [['position_id', 'ASC']]});
            return  res.status(500).json({
                    datoBuscado
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)    
    } 
       

}



const positionsGet= async(req= request, res= response) => {

 const {id} = req.params;
       try {
        verificacionNumero(id,8)

        const datoBuscado =  await Positions.findOne({ where:{ position_id: verificacionNumero(id,3)} })
            if(!datoBuscado){
                return   res.status(400).json({
                    msg: `No existe este native_id ${verificacionNumero(id,3)}`    
        
            });
        }
        
        return  res.status(200).json({id,datoBuscado})
        
       } catch (error) {
        console.log(error);
        return  res.status(400).json(error) 
       } 
 

 
}



const positionsPost = async(req = request, res = response) => {

    const {position_id, position_name} = req.body;
    
try {
        const datoBuscado= await Positions.findOne({ where:{ position_id: verificacionNumero(position_id,3) } })    
                
                if(datoBuscado){
                  return  res.status(500).json({
                        msg:` El Id ${position_id} ya Existe en la base de datos `,
                        datoBuscado
                        });
                }

                const datoUpdate={
                          position_id:  verificacionNumero(position_id, 3),        
                        position_name:  position_name.toUpperCase().trim() ??  verificacionNumero(position_id, 50),      
                }

               const busquedaExistentes = await Positions.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existedato = busquedaExistentes.some(dato => dato.position_name.toUpperCase().trim() === position_name.toUpperCase().trim());
                let coincidentes=''
                 if(existedato){
                    
                    coincidentes = busquedaExistentes.filter(dato => dato.position_name.toUpperCase().trim() === position_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidentes
                                  });
                 }
                    
                   const nuevoDato = await Positions.create(datoUpdate);

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


const positionsPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {position_id, position_name} = req.body;
    
    // Convertir el ID del parámetro para búsqueda
    const idBusqueda = verificacionNumero(id, 3);

    if(idBusqueda!==position_id){
         return res.status(404).json({
            msg: `El position_id con ID ${verificacionNumero(id,3)} no es igual al native_id enviado:  ${position_id} `,
        });
    }

    // Buscar el departamento que se quiere actualizar usando el ID del parámetro
    const Existentedato = await Positions.findOne({ where: { position_id: idBusqueda }});
    
    if (!Existentedato) {
        return res.status(404).json({
            msg: `El position_id con ID ${verificacionNumero(id,3)} no existe en la base de datos`,
        });
    }

    // Preparar datos para actualización
    
                const datoActualizador={
                          position_id:  verificacionNumero(position_id, 3),        
                        position_name:  position_name.toUpperCase().trim() ?? verificacionNumero(position_id, 3),      
                          
                }
 
                const busquedaExistentes = await Positions.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeDato = busquedaExistentes.some(dato => dato.position_name.toUpperCase().trim() === position_name.toUpperCase().trim());
                let coincidencias=''
                 if(existeDato){
                    coincidencias = busquedaExistentes.filter(dato => dato.position_name.toUpperCase().trim() === position_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidencias
                                  });
                 }

    // Actualizar el departamento usando el ID original para la búsqueda
    const [numeroFilasActualizadas] = await Positions.update(datoActualizador, {
        where: { position_id: datoActualizador.position_id }
    });
    

    return res.status(200).json({
        msg: "Estatus actualizado exitosamente",
        numeroFilasActualizadas,
        datoActualizador
        
    });
};


const positionsDelete = async(req = request, res = response) => {
 
  const {id}= req.params;
  
  try {

         const codigo = verificacionNumero(id,3);
         const busqueda = await Positions.findOne({ where:{ position_id :  codigo  } })

        if(!busqueda){
            return   res.status(500).json({
                id,
                msg: `No existe el position_id con codigo ${codigo} para ser eliminado.. `
            });
        }
       
            await busqueda.destroy();

            return   res.status(200).json({
                  msg: `position_id Eliminado con exito`,
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

positionssGet,
positionsGet,
positionsPost,
positionsPut,
positionsDelete,

}


