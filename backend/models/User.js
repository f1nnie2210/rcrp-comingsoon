const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Admin: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'accounts',
  timestamps: false,
});

module.exports = User;