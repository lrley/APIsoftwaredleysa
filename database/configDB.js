
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');


const db_Connection_Mongoose= async()=>{
        try {
          console.log('entro a db conecction mongoose');
                await mongoose.connect(process.env.DB_AASFF_MONGO);
                console.log(`Base de datos DLACCESS MONGOOSE ONLINE`);
        } catch (error) {
                console.log(error);
                throw new Error('Error a la hora de iniciar la base de datos')
        }
}

const db_Connection_SQLServer = new Sequelize('AASFF', 'DLACCESS', 'Dleysa253018+-', {
 
  host: 'localhost',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false, // Cambiar a true para Azure
      trustServerCertificate: true,
      enableArithAbort: true,
      dateFirst: 1,
      requestTimeout: 30000,
      // Estas opciones son específicas para resolver problemas de TLS en Node.js v22
      cryptoCredentialsDetails: {
        secureProtocol: 'TLSv1_method'
      }
    },
    instanceName: '',
    useUTC: false,

  },

  define: {
    freezeTableName: true,
    timestamps: false
  },
  

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false // Cambiar a console.log para ver las consultas SQL
});



const db_Connection_MySql = new Sequelize('dbsistema', 'root', 'Dleysa253018+-', {
    host:'localhost',
    dialect: 'mysql',
    //logging: false,

})












module.exports={

db_Connection_Mongoose,
db_Connection_MySql,
db_Connection_SQLServer,

}