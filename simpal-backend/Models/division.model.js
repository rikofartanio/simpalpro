const {DataTypes} = require('sequelize');
const dbConn = require('../Config/db');

const Division = dbConn.define('Division', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type : DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'division',
    timestamps: false
});

//Method associate
Division.associate = function(models){
    Division.hasMany(models.Report,{
        foreignKey: 'divisionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
}

module.exports = Division;