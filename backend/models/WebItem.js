const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Webitem = sequelize.define('webitem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
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
  badgeText: {
    type: DataTypes.STRING,
  },
  badgeIcon: {
    type: DataTypes.STRING,
  },
  topLevelText: {
    type: DataTypes.STRING,
  },
  shortDesc: {
    type: DataTypes.JSON,
  },
}, {
  tableName: 'webitems',
  timestamps: false,
});

module.exports = Webitem;