const Usuario =  require('../../models/modelsMongoose/usuario')


const existeEmail = async(req=request,res=response,next)=>{

    const {email}= req.body
    const EmailExiste = await Usuario.findOne({email})
      if(EmailExiste){
         return res.status(400).json({msg:`El Email: ${email} ya existe en un usuario`})
      }

next();
}


module.exports = {
    existeEmail
}
 

