const { DataTypes, Model } = require('sequelize');
const { db_Connection_SQLServer } = require('../../database/configDB');

// Define la clase del modelo
class Employee extends Model {}

// Inicializa el modelo
Employee.init(
  {
            id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
            emp_id: {
            type: DataTypes.STRING(12),
            allowNull: false
            },
            card_id: {
            type: DataTypes.STRING(16),
            allowNull: false
            },
            card_id1: {
            type: DataTypes.STRING(16),
            allowNull: true,
            defaultValue: null
            },
            emp_name: {
            type: DataTypes.STRING(20),
            allowNull: false
            },
            id_card: {
            type: DataTypes.STRING(20),
            allowNull: false
            },
            no_sign: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
            },
            depart_id: {
            type: DataTypes.STRING(8),
            allowNull: false
            },
            job_id: {
            type: DataTypes.STRING(3),
            allowNull: false
            },
            rule_id: {
            type: DataTypes.STRING(8),
            allowNull: false,
            defaultValue: ""
            },
            edu_id: {
            type: DataTypes.STRING(3),
            allowNull: false
            },
            native_id: {
            type: DataTypes.STRING(3),
            allowNull: false
            },
            nation_id: {
            type: DataTypes.STRING(3),
            allowNull: false
            },
            status_id: {
            type: DataTypes.STRING(3),
            allowNull: false
            },
            dorm_id: {
            type: DataTypes.STRING(3),
            allowNull: false,
            defaultValue: ""
            },
            polity_id: {
            type: DataTypes.STRING(3),
            allowNull: false
            },
            position_id: {
            type: DataTypes.STRING(3),
            allowNull: false
            },
            gd_school: {
            type: DataTypes.STRING(100),
            allowNull: false
            },
            gd_date: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '2025-01-01'
            },
            speciality: {
            type: DataTypes.STRING(100),
            allowNull: false
            },
            birth_date: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '2025-01-01'
            },
            hire_date: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '2025-01-01'
            },
            sex: {
            type: DataTypes.STRING(4),
            allowNull: false
            },
            marriage: {
            type: DataTypes.STRING(4),
            allowNull: false
            },
            email: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
            phone_code: {
            type: DataTypes.STRING(20),
            allowNull: true
            },
            address: {
            type: DataTypes.STRING(100),
            allowNull: true
            },
            post_code: {
            type: DataTypes.STRING(8),
            allowNull: true
            },
            ClockMsg: {
            type: DataTypes.STRING(64),
            allowNull: true
            },
          
                     
            photo: {
            type: DataTypes.BLOB('long'),
            allowNull: true
            },
          
          
          
            memo: {
            type: DataTypes.TEXT,
            allowNull: true
            },
            card_sn: {
            type: DataTypes.STRING(50),
            allowNull: true
            },
            cardlb: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
            },
            chkjine: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
            defaultValue: 0.00
            },
            qkjine: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
            defaultValue: 0.00
            },
            btjine: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
            defaultValue: 0.00
            },
            xfjine: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
            defaultValue: 0.00
            },
            cardlast: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
            defaultValue: 0.00
            },
            cardxfcs: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
            },
            yajin: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: true,
            defaultValue: 0.00
            },
            fakarq: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
            },
            fakasj: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
            },
            fakasize: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
            },
            chlrq: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
            },
            chlsize: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
            },
            guarq: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
            },
            guasj: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
            },
            guasize: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
            },
            card_pass: {
            type: DataTypes.CHAR(50),
            allowNull: true,
            defaultValue: null
            },
            opter: {
            type: DataTypes.CHAR(16),
            allowNull: true,
            defaultValue: null
            },
            end_date: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '2025-01-01'
            },
            f_name: {
            type: DataTypes.STRING(50),
            allowNull: true
            }
  },
  {
    sequelize: db_Connection_SQLServer,
    tableName: 'Employee', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Sin timestamps 
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
  }
);

module.exports = Employee;