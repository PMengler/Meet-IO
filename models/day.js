//day has many events
// user has many events

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Day extends Model {}

Day.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'day',
  }
);

module.exports = Day;
