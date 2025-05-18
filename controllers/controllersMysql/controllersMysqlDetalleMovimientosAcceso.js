const {response, request}= require('express')


const detallemovimientosmysqlGet = async(req= request, res= response) => {
      
 res.status(400).json({
    msg:`Todo ok con GETs varios movimientos`
 })

    
}



const detallemovimientomysqlGet= (req= request, res= response) => {
    const {id}= req.params
    const {nombre='Sin nombre', apikey='', page=1, limit=10} =  req.query;

    res.status(400).json({
        msg:`Todo ok con GET solo un movimiento`,
        id
    })


 
}




const detallemovimientomysqlPost = (req= request, res= response) => {

   res.status(400).json({
    msg:`Todo ok con Post`
 })


}




const detallemovimientomysqlPut = (req, res) => {
               
       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Put`,
    id
 })

}



const detallemovimientomysqlDelete = (req, res) => {

       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Delete`,
    id
 })

            
}

module.exports= {

detallemovimientosmysqlGet,
detallemovimientomysqlGet,
detallemovimientomysqlPost,
detallemovimientomysqlPut,
detallemovimientomysqlDelete


}