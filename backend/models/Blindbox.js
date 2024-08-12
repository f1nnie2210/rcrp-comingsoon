// backend/models/Blindbox.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Blindbox = sequelize.define(
    "Blindbox",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        maxItems: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "blindboxes",
        timestamps: false,
    }
);

module.exports = Blindbox;
