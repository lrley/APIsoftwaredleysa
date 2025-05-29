const { DataTypes, Model } = require('sequelize');
const { db_Connection_SQLServer } = require('../../../database/configDB');

// Define la clase del modelo
class TblzEnrollFace extends Model {}

// Inicializa el modelo
TblzEnrollFace.init(
  {
            EMachineNumber: {
            type: DataTypes.INTEGER,
            allowNull: true
            },

            EnrollNumber: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           allowNull: true
            },

            UserName: {
            type: DataTypes.STRING(50),
            allowNull: true
            },

            FingerNumber: {
            type: DataTypes.INTEGER,
            allowNull: true
            },

            Privilege:{
            type: DataTypes.INTEGER,
            allowNull: true
            },

            Password:{
            type: DataTypes.STRING(50),
            allowNull: true
            },

            Template:{
            type: DataTypes.STRING(100),
            allowNull: true
            },


           
  },
  {
    sequelize: db_Connection_SQLServer,
    tableName: 'tblzEnrollFace', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Sin timestamps 
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
  }
);

module.exports = TblzEnrollFace;