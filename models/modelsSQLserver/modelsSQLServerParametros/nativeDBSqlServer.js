const { DataTypes, Model } = require('sequelize');
const { db_Connection_SQLServer } = require('../../../database/configDB');

// Define la clase del modelo
class Native extends Model {}

// Inicializa el modelo
Native.init(
  {
            native_id: {
            type: DataTypes.STRING(3),
            primaryKey: true,
            autoIncrement: false
            },
            
            native_name: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
  },

  {
    sequelize: db_Connection_SQLServer,
    tableName: 'Native', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Sin timestamps 
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
  }

  
);



module.exports = Native;