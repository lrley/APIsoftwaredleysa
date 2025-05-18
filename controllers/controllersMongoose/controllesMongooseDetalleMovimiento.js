const {response, request}= require('express')


const detallemovimientosMongooseGet = async(req= request, res= response) => {
      
 res.status(400).json({
    msg:`Todo ok con GETs varios movimientos Mongoose`
 })

    
}



const detallemovimientoMongooseGet= (req= request, res= response) => {
    const {id}= req.params
    const {nombre='Sin nombre', apikey='', page=1, limit=10} =  req.query;

    res.status(400).json({
        msg:`Todo ok con GET solo un movimiento Mongoose`,
        id
    })


 
}




const detallemovimientoMongoosePost = (req= request, res= response) => {

   res.status(400).json({
    msg:`Todo ok con Post movimiento Mongoose`
 })


}




const detallemovimientoMongoosePut = (req, res) => {
               
       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Put movimiento Mongoose`,
    id
 })

}



const detallemovimientoMongooseDelete = (req, res) => {

       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Delete movimiento Mongoose`,
    id
 })

            
}

module.exports= {

detallemovimientosMongooseGet,
detallemovimientoMongooseDelete,
detallemovimientoMongooseGet,
detallemovimientoMongoosePost,
detallemovimientoMongoosePut,

}