const {response, request}= require('express')
const { verificacionNumero } = require('../../../helpers/verificacionNumero');
const Positions = require('../../../models/modelsSQLserver/modelsSQLServerParametros/positiosDBSqlServer');
const Polity = require('../../../models/modelsSQLserver/modelsSQLServerParametros/polityDBSqlServer');






const politysGet = async(req= request, res= response) => {
   
    
    try {
        const datoBuscado =  await Polity.findAll({order: [['polity_id', 'ASC']]});
            return  res.status(500).json({
                    datoBuscado
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)    
    } 
       

}



const polityGet= async(req= request, res= response) => {

  const {id} = req.params;
       try {
        verificacionNumero(id,8)

        const datoBuscado =  await Polity.findOne({ where:{ polity_id: verificacionNumero(id,3)} })
            if(!datoBuscado){
                return   res.status(400).json({
                    msg: `No existe este polity_id ${verificacionNumero(id,3)}`    
        
            });
        }
        
        return  res.status(200).json({id,datoBuscado})
        
       } catch (error) {
        console.log(error);
        return  res.status(400).json(error) 
       }  
 

 
}



const polityPost = async(req = request, res = response) => {

    const {polity_id, polity_name} = req.body;
    
try {
        const datoBuscado= await Polity.findOne({ where:{ polity_id: verificacionNumero(polity_id,3) } })    
                
                if(datoBuscado){
                  return  res.status(500).json({
                        msg:` El Id ${polity_id} ya Existe en la base de datos `,
                        datoBuscado
                        });
                }

                const datoUpdate={
                          polity_id:  verificacionNumero(polity_id, 3),        
                        polity_name:  polity_name.toUpperCase().trim() ??  verificacionNumero(polity_id, 50),      
                }

               const busquedaExistentes = await Polity.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existedato = busquedaExistentes.some(dato => dato.polity_name.toUpperCase().trim() === polity_name.toUpperCase().trim());
                let coincidentes=''
                 if(existedato){
                    
                    coincidentes = busquedaExistentes.filter(dato => dato.polity_name.toUpperCase().trim() === polity_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidentes
                                  });
                 }
                    
                   const nuevoDato = await Polity.create(datoUpdate);

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


const polityPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {polity_id, polity_name} = req.body;
    
    // Convertir el ID del parámetro para búsqueda
    const idBusqueda = verificacionNumero(id, 3);

    if(idBusqueda!==polity_id){
         return res.status(404).json({
            msg: `El polity_id con ID ${verificacionNumero(id,3)} no es igual al polity_id enviado:  ${polity_id} `,
        });
    }

    // Buscar el departamento que se quiere actualizar usando el ID del parámetro
    const Existentedato = await Polity.findOne({ where: { polity_id: idBusqueda }});
    
    if (!Existentedato) {
        return res.status(404).json({
            msg: `El polity_id con ID ${verificacionNumero(id,3)} no existe en la base de datos`,
        });
    }

    // Preparar datos para actualización
    
                const datoActualizador={
                          polity_id:  verificacionNumero(polity_id, 3),        
                        polity_name:  polity_name.toUpperCase().trim() ?? verificacionNumero(polity_id, 3),      
                          
                }
 
                const busquedaExistentes = await Polity.findAll();
                        // Asegurarte que estás comparando con igualdad de mayúsculas/minúsculas
                const existeDato = busquedaExistentes.some(dato => dato.polity_name.toUpperCase().trim() === polity_name.toUpperCase().trim());
                let coincidencias=''
                 if(existeDato){
                    coincidencias = busquedaExistentes.filter(dato => dato.polity_name.toUpperCase().trim() === polity_name.toUpperCase().trim());
                        return res.status(200).json({
                                   msg:'Este nombre que desea ingresar ya existe en la base ',
                                   coincidencias
                                  });
                 }

    // Actualizar el departamento usando el ID original para la búsqueda
    const [numeroFilasActualizadas] = await Polity.update(datoActualizador, {
        where: { polity_id: datoActualizador.polity_id }
    });
    

    return res.status(200).json({
        msg: "Estatus actualizado exitosamente",
        numeroFilasActualizadas,
        datoActualizador
        
    }); 
};


const polityDelete = async(req = request, res = response) => {
 
  const {id}= req.params;
  
  try {

         const codigo = verificacionNumero(id,3);
         const busqueda = await Polity.findOne({ where:{ polity_id :  codigo  } })

        if(!busqueda){
            return   res.status(500).json({
                id,
                msg: `No existe el polity_id con codigo ${codigo} para ser eliminado.. `
            });
        }
       
            await busqueda.destroy();

            return   res.status(200).json({
                  msg: `polity_id Eliminado con exito`,
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

politysGet,
polityGet,
polityPost,
polityPut,
polityDelete,

}


