

const {response, request}= require('express')



const rolsMongooseGet = async(req= request, res= response) => {
      
 res.status(400).json({
    msg:`Todo ok con GETs varios Roles Mongoose`
 })

    
}



const rolMongooseGet= (req= request, res= response) => {
    const {id}= req.params
    const {nombre='Sin nombre', apikey='', page=1, limit=10} =  req.query;

    res.status(400).json({
        msg:`Todo ok con GET solo un Rol Mongoose`,
        id
    })


 
}




const rolMongoosePost = (req= request, res= response) => {

   res.status(400).json({
    msg:`Todo ok con Post Rol Mongoose`
 })


}




const rolMongoosePut = (req, res) => {
               
       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Put Rol Mongoose`,
    id
 })

}



const rolMongooseDelete = (req, res) => {

       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Delete Rol Mongoose`,
    id
 })

            
}

module.exports= {

rolsMongooseGet   ,
rolMongooseGet , 
rolMongoosePost  ,
rolMongoosePut  , 
rolMongooseDelete

}