const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BlindboxItem = sequelize.define(
    "BlindboxItem",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        blindboxId: {
            type: DataTypes.INTEGER,
            references: {
                model: "blindboxes",
                key: "id",
            },
        },
        webitemId: {
            type: DataTypes.INTEGER,
            references: {
                model: "webitems",
                key: "id",
            },
        },
    },
    {
        tableName: "blindbox_items",
        timestamps: false,
    }
);

module.exports = BlindboxItem;
