const { DataTypes, Model } = require('sequelize');
const { db_Connection_SQLServer } = require('../../../database/configDB');

// Define la clase del modelo
class Depart extends Model {}

// Inicializa el modelo
Depart.init(
  {
            depart_id: {
            type: DataTypes.STRING(8),
            primaryKey: true,
            autoIncrement: false
            },
            
            upper_depart_id: {
            type: DataTypes.STRING(8),
            allowNull: true
            },
            
            depart_name: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
            
            principal: {
            type: DataTypes.STRING(20),
            allowNull: true
            },

  },

  {
    sequelize: db_Connection_SQLServer,
    tableName: 'Depart', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Sin timestamps 
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
  }
);

module.exports = Depart;