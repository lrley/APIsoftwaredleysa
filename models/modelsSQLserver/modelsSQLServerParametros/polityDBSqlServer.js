const { DataTypes, Model } = require('sequelize');
const { db_Connection_SQLServer } = require('../../../database/configDB');

// Define la clase del modelo
class Polity extends Model {}

// Inicializa el modelo
Polity.init(
  {
            polity_id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            autoIncrement: false
            },
            
            polity_name: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
  },

  {
    sequelize: db_Connection_SQLServer,
    tableName: 'Polity', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Sin timestamps 
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
  }

  
);



module.exports = Polity;