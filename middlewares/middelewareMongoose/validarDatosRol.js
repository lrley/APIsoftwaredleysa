const Rol =  require('../../models/modelsMongoose/usuario')


const existeRol = async(req=request,res=response,next)=>{

    const {rol}= req.body
    const RolExiste = await Rol.findOne({rol})
      if(RolExiste){
         return res.status(400).json({msg:`El Email: ${rol} ya existe en la base de Roles`})
      }

next();
}


module.exports = {
    existeRol
}
 
