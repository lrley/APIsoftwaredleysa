const express = require('express');
const cors = require ('cors')
const rutasSQLServerEmployee =  require('../routes/routesSQLserver/rutasSQLServerEmployee')
class Server{  //creacion de la clase Server
        
        constructor(){
            this.app= express();
            this.port = process.env.PORT || '3000';
            this.apiRutas = {
              employee: '/api/empleadosqlserver',

            }
                
            //MIDDLEWARES
            this.middlewares();

            //Definir mis rutas
            this.rutas();
        }

        middlewares(){
            //CORS
            this.app.use(cors())

            //LECTURA Y PARSEO DEL BODY
            this.app.use(express.json())

            //Directorio Publico
            this.app.use(express.static('public'))
        }

        rutas(){
          this.app.use( this.apiRutas.employee,rutasSQLServerEmployee)
        }
    

        listen(){
            this.app.listen(this.port, ()=>{
            console.log('Servidor Corriendo en el puerto ', this.port);
            })
        }

}

module.exports = Server;