const {Sequelize} = require("sequelize");
const {sequelize} = require("./index");

const Task = sequelize.define(
    "task",
    {
        task_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        task_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        procedure_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        task_settings: {
            type: Sequelize.JSON,
            allowNull: false,
        },
    },
    {timestamps: false}
);

module.exports = {
    Task,
};
