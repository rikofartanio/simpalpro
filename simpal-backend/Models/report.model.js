const {DataTypes} = require('sequelize');
const sequelize = require('../Config/db');
const Division = require('./division.model');

const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reporterName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Open','In Progress', 'Done'),
        defaultValue: 'Open'
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull : true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    divisionId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: Division,
            key: 'id'
        }
    }
},{
    tableName: 'reports',
    timestamps: true
});

//relasi
Report.associate = function(models) {
    Report.belongsTo(models.Division, {
        foreignKey: 'divisionId',
        as: 'division',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};


module.exports = Report;