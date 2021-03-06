const Sequelize = require("sequelize");
const {DIALECT, DATA_BASE_NAME, USER_NAME, PASSWORD, HOST} = require("@constants/environemtConstants");

const sequelize = new Sequelize(DATA_BASE_NAME, USER_NAME, PASSWORD, {
    dialect: DIALECT,
    host: HOST,
    dialectOptions: {
        useUTC: true,
    },
    timezone: "+02:00",
});

module.exports = {
    sequelize,
};
