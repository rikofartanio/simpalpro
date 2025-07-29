const sequelize = require('../Config/db');
const Report = require('./report.model');
const Division =require('./division.model');


const models = {
    Report,
    Division
};

Object.values(models).forEach((model)=>{
    if (typeof model.associate === 'function'){
        model.associate(models);
    }
});

const initDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log("DB Connection successfully");
        await sequelize.sync();
        console.log("All models synced")
    } catch (error) {
        console.log("Failed to sync database", error)
    }
};


module.exports = {initDB, sequelize, models};