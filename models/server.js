const express = require('express');
const cors = require ('cors')
const fileUpload = require('express-fileupload');
const { db_Connection_Mongoose, db_Connection_SQLServer, db_Connection_MySql } = require('../database/configDB');

//Enlace con Rutas SQLserver
const rutasSQLServerEmployee =  require('../routes/routesSQLserver/rutasSQLServerEmployee');

//Enlace con Rutas base Mysql
const RutaDetalleMovimientoMysql= require('../routes/routesMysql/rutasMysqlDetalleMovimientoAcceso');

//Enlace con Rutas Base Mongoose
const RutaDetalleMovimientoMongoose = require('../routes/routesMongoose/rutasMongooseDetalleMovimientosacceso');
const RutaUsuario = require('../routes/routesMongoose/rutaMongooseUsuario');
const RutaRolMongoose = require('../routes/routesMongoose/rutasRolMongoose');

class Server{  //creacion de la clase Server
        
        constructor(){
            this.app= express();
            this.port = process.env.PORT || '3000';
            
            this.apiRutasSQLSERVER = {
              employee: '/api/empleadosqlserver',
            }

            this.apirutasMYSQL={
                DetalleMovimientoMysql: '/api/detallemovimientomysql/',
            }

            this.apiRutasMONGOOSE={
                DetalleMovimientoMongoose:'/api/detallemovimientomongoose/',
                RutaUsuario:'/api/usuariosmongoose/',
                RutaRolMongoose:'/api/rolesmongoose/'
            }


            //CONECTAR A LAS BASES DE DATOS MONGOOSE MYSQL SQLSERVER
            this.conectarDBMongooseDLACCESS();
            this.conectarDBSqlServer();
            this.conectarDBMysql();
            
            //MIDDLEWARES
            this.middlewares();

            //Definir mis rutas
            this.rutas();
        }

        //Funcion de conexion a base de datos Mongoose
        async conectarDBMongooseDLACCESS(){
            await db_Connection_Mongoose();

        }

        //Funcion de conexion a base de datos SQLSERVER
        async conectarDBSqlServer(){
            try {
                await db_Connection_SQLServer.authenticate();
                console.log('Data Base Online SQLSERVER');
            } catch (error ) {
                throw new Error(error);
            }
        }


        //Funcion de conexion a base de datos Mysql
         async conectarDBMysql(){
            try {
                await db_Connection_MySql.authenticate();
                console.log('Data Base Online MYSQL');
            } catch (error ) {
                throw new Error(error);
            }
        }



        middlewares(){
            //CORS
            this.app.use(cors())

            //LECTURA Y PARSEO DEL BODY
            this.app.use(express.json())

            //Directorio Publico
            this.app.use(express.static('public'))

            //Fileupload - carga de archivos
            this.app.use(fileUpload({
                //limits: { fileSize: 50 * 1024 * 1024 },
                useTempFiles : true,
                tempFileDir : '/tmp/'
            }));
        }

        rutas(){
          
            //Rutas de conexion con SQLSERVER
          this.app.use( this.apiRutasSQLSERVER.employee,rutasSQLServerEmployee);  // Conecta con Empleados SQLserver
          
          //Rutas de conexion con MySQL
          this.app.use(this.apirutasMYSQL.DetalleMovimientoMysql,RutaDetalleMovimientoMysql);  //Conecta con Detalle Movimiento Mysql
          
          //Rutas de conexion con MONGOOSE
          this.app.use(this.apiRutasMONGOOSE.DetalleMovimientoMongoose,RutaDetalleMovimientoMongoose); //conecta con detalle movimiento Mongoose
          this.app.use(this.apiRutasMONGOOSE.RutaUsuario,RutaUsuario);  //Conecta con Usuarios Mongoose 
          this.app.use(this.apiRutasMONGOOSE.RutaRolMongoose,RutaRolMongoose) //Conecta con Rol Mongoose
        }
    

        listen(){
            this.app.listen(this.port, ()=>{
            console.log('Servidor Corriendo en el puerto ', this.port);
            })
        }

}

module.exports = Server;