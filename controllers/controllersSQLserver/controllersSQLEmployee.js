const {response, request}= require('express')


const empoyeesGet = (req= request, res= response) => {
      
    
    res.send('get todos los empleados')
}



const employeeGet= (req= request, res= response) => {

    const {id}= req.params
    const {nombre='Sin nombre', apikey='', page=1, limit=10} =  req.query;

    res.json({
        id,
        msg: 'Get empleado',
        nombre,
        apikey,
        page,
        limit
    })

 
}




const employeePost = (req= request, res= response) => {

   res.send('POST un empleado')

}




const employeePut = (req, res) => {
               
    
    res.send('put empleado')
}



const employeeDelete = (req, res) => {


    res.send('Deltete empleado')
            
}

module.exports= {

empoyeesGet,
employeeGet,
employeePost,
employeePut,
employeeDelete


}