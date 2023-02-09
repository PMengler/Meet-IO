
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Event extends Model {}

Event.init(
  {
    title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    sequelize.sync({ force: false }).then(() => {
        console.log("Calendar event created");
      });

module.exports = Event;