const {DataTypes} = require ('sequelize');
const { db_Connection_MySql } = require('../../database/configDB');


const detallemovimientosacceso= db_Connection_MySql.define('detallemovimientosacceso', {

    iddetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true // ✅ Importante: lo marcas como clave primaria
    },
    
    idusuario:{
        type: DataTypes.INTEGER
    },
    
    usuario:{
        type: DataTypes.STRING
    },
     
    idemployee:{
        type: DataTypes.INTEGER
    },

    fname:{
        type: DataTypes.STRING
    },
    
    num_comprobante:{
        type: DataTypes.STRING
    },

    fechainicio:{
        type: DataTypes.DATE
    },

     fechafin:{
        type: DataTypes.DATE
    },

    tipomovimiento:{
        type: DataTypes.STRING
    },

    fechaactual:{
        type: DataTypes.DATE
    }


}, {
    timestamps: false, // <-- Desactiva createdAt y updatedAt
    tableName: 'detallemovimientosacceso' 
    
});

module.exports= detallemovimientosacceso;