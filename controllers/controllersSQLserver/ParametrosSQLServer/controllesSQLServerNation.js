const {response, request}= require('express')
const { verificacionNumero } = require('../../../helpers/verificacionNumero');
const Nation = require('../../../models/modelsSQLserver/modelsSQLServerParametros/nationDBSqlServer');




const nationsGet = async(req= request, res= response) => {
   
    
    try {
        const datoBuscado =  await Nation.findAll({order: [['nation_id', 'ASC']]});
            return  res.status(500).json({
                    datoBuscado
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)    
    } 
       

}



const nationGet= async(req= request, res= response) => {

 const {id} = req.params;
       try {
        verificacionNumero(id,8)

        const datoBuscado =  await Nation.findOne({ where:{ nation_id: verificacionNumero(id,3)} })
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



const nationPost = async(req = request, res = response) => {

    const {nation_id, nation_name} = req.body;
    
try {
        const datoBuscado= await Nation.findOne({ where:{ nation_id: verificacionNumero(nation_id,3) } })    
                
                if(datoBuscado){
                  return  res.status(500).json({
                        msg:` El Id ${nation_id} ya Existe en la base de datos `,
                        datoBuscado
                        });
                }

                const datoUpdate={
                          nation_id:  verificacionNumero(nation_id, 3),        
                        nation_name:  nation_name.toUpperCase().trim() ??  verificacionNumero(nation_id, 3),      
                }

               const busquedaExistentes = await Nation.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existedato = busquedaExistentes.some(dato => dato.nation_name.toUpperCase().trim() === nation_name.toUpperCase().trim());
                let coincidentes=''
                 if(existedato){
                    
                    coincidentes = busquedaExistentes.filter(dato => dato.nation_name.toUpperCase().trim() === nation_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidentes
                                  });
                 }
                    
                   const nuevoDato = await Nation.create(datoUpdate);

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


const nationPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {nation_id, nation_name} = req.body;
    
    // Convertir el ID del parámetro para búsqueda
    const idBusqueda = verificacionNumero(id, 3);

    if(idBusqueda!==nation_id){
         return res.status(404).json({
            msg: `El nation_id con ID ${verificacionNumero(id,3)} no es igual al status_id enviado:  ${nation_id} `,
        });
    }

    // Buscar el departamento que se quiere actualizar usando el ID del parámetro
    const Existentedato = await Nation.findOne({ where: { nation_id: idBusqueda }});
    
    if (!Existentedato) {
        return res.status(404).json({
            msg: `El nation_id con ID ${verificacionNumero(id,3)} no existe en la base de datos`,
        });
    }

    // Preparar datos para actualización
    
                const datoActualizador={
                          nation_id:  verificacionNumero(nation_id, 3),        
                        nation_name:  nation_name.toUpperCase().trim() ?? verificacionNumero(nation_id, 3),      
                          
                }
 
                const busquedaExistentes = await Nation.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeDato = busquedaExistentes.some(dato => dato.nation_name.toUpperCase().trim() === nation_name.toUpperCase().trim());
                let coincidencias=''
                 if(existeDato){
                    coincidencias = busquedaExistentes.filter(dato => dato.nation_name.toUpperCase().trim() === nation_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidencias
                                  });
                 }

    // Actualizar el departamento usando el ID original para la búsqueda
    const [numeroFilasActualizadas] = await Nation.update(datoActualizador, {
        where: { nation_id: datoActualizador.nation_id }
    });
    

    return res.status(200).json({
        msg: "Estatus actualizado exitosamente",
        numeroFilasActualizadas,
        datoActualizador
        
    });
};


const nationDelete = async(req = request, res = response) => {

  const {id}= req.params;
  
  try {

         const codigo = verificacionNumero(id,3);
         const busqueda = await Nation.findOne({ where:{ nation_id :  codigo  } })

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

nationsGet,
nationGet,
nationPost,
nationPut,
nationDelete,

}


