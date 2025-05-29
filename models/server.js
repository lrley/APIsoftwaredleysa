const express = require('express');
const cors = require ('cors')
const fileUpload = require('express-fileupload');
const { db_Connection_Mongoose, db_Connection_SQLServer, db_Connection_MySql, db_Connection_Mongoose_Desarrollo} = require('../database/configDB');

//Enlace con Rutas SQLserver
const rutasSQLServerEmployee =  require('../routes/routesSQLserver/rutasSQLServerEmployee');
const rutaSQLServerDepart = require('../routes/routesSQLserver/rutasSQLServerParametros/rutasSqlServerDepart');
const rutaSQLServerJob = require('../routes/routesSQLserver/rutasSQLServerParametros/rutasSqlServerJob');
const rutaSQLServerStatus = require('../routes/routesSQLserver/rutasSQLServerParametros/rutasSqlServerStatus');
const rutaSQLServerEducation= require('../routes/routesSQLserver/rutasSQLServerParametros/rutasSqlServerEducation');
const rutaSQLServerNation= require('../routes/routesSQLserver/rutasSQLServerParametros/rutasSqlServerNation')
const rutaSQLServerNative= require('../routes/routesSQLserver/rutasSQLServerParametros/rutasSqlServerNative')
const rutaSQLServerPositions= require('../routes/routesSQLserver/rutasSQLServerParametros/rutasSqlServerPositions')
const rutaSQLServerPolity= require('../routes/routesSQLserver/rutasSQLServerParametros/rutasSqlServerPolity')

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
              employee: '/api/empleadosqlserver/',
                depart: '/api/departsqlserver/',
                   job: '/api/jobsqlserver/',
                status: '/api/statussqlserver/',
             education: '/api/educationsqlserver/',
                nation: '/api/nationsqlserver/',
                native: '/api/nativesqlserver/',
             positions: '/api/positionssqlserver/',
                polity: '/api/politysqlserver/',
            }

            this.apirutasMYSQL={
                DetalleMovimientoMysql: '/api/detallemovimientomysql/',
            }

            this.apiRutasMONGOOSE={
                DetalleMovimientoMongoose:'/api/detallemovimientomongoose/',
                RutaUsuario:'/api/usuariosmongoose/',
                RutaRolMongoose:'/api/rolesmongoose/',
            }


            //CONECTAR A LAS BASES DE DATOS MONGOOSE MYSQL SQLSERVER
          //  this.conectarDBMongooseDLACCESS();
            this.conectarDBMongooseDLACCESS_Desarrollo();
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


        async conectarDBMongooseDLACCESS_Desarrollo(){
           await db_Connection_Mongoose_Desarrollo();
            /*// await db_Connection_Mongoose_Desarrollo();
            this.devConnection = await db_Connection_Mongoose_Desarrollo();
            this.app.set('devConnection', this.devConnection); // así lo haces accesible en controllers*/
        
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
                limits: { fileSize: 480 * 640 },
                useTempFiles : false,
                tempFileDir : '/tmp/'
            }));
        }

        rutas(){
          
            //Rutas de conexion con SQLSERVER
          this.app.use( this.apiRutasSQLSERVER.employee,rutasSQLServerEmployee);  // Conecta con Empleados SQLserver
          this.app.use(this.apiRutasSQLSERVER.depart,rutaSQLServerDepart);
          this.app.use(this.apiRutasSQLSERVER.job,rutaSQLServerJob);
          this.app.use(this.apiRutasSQLSERVER.status,rutaSQLServerStatus);
          this.app.use(this.apiRutasSQLSERVER.education,rutaSQLServerEducation);
          this.app.use(this.apiRutasSQLSERVER.nation,rutaSQLServerNation);
          this.app.use(this.apiRutasSQLSERVER.native,rutaSQLServerNative);
          this.app.use(this.apiRutasSQLSERVER.positions,rutaSQLServerPositions);
          this.app.use(this.apiRutasSQLSERVER.polity,rutaSQLServerPolity);
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