const sequelize = require('../config/connection');
const { User, Event, Day } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Event.bulkCreate(eventData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
