const {response, request}= require('express')



const UsuariosMongooseGet = async(req= request, res= response) => {
      
 res.status(400).json({
    msg:`Todo ok con GETs varios Usuarios Mongoose`
 })

    
}



const UsuarioMongooseGet= (req= request, res= response) => {
    const {id}= req.params
    const {nombre='Sin nombre', apikey='', page=1, limit=10} =  req.query;

    res.status(400).json({
        msg:`Todo ok con GET solo un Usuarios Mongoose`,
        id
    })


 
}




const UsuarioMongoosePost = (req= request, res= response) => {

   res.status(400).json({
    msg:`Todo ok con Post Usuarios Mongoose`
 })


}




const UsuarioMongoosePut = (req, res) => {
               
       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Put Usuarios Mongoose`,
    id
 })

}



const UsuarioMongooseDelete = (req, res) => {

       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Delete Usuarios Mongoose`,
    id
 })

            
}

module.exports= {

UsuariosMongooseGet,  
UsuarioMongooseGet,   
UsuarioMongoosePost,  
UsuarioMongoosePut,   
UsuarioMongooseDelete,

}