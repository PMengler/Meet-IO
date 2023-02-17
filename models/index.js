const User = require('./User');
const Event = require('./Event');
// const Day = require('./Day');

User.hasMany(Event, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Event.belongsTo(User, {
  foreignKey: 'user_id',
});

Event.belongsToMany(User, {
  through: 'event_user',
  foreignKey: 'event_id',
  onDelete: 'CASCADE',
});

// User.hasMany(Day, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Event.belongsTo(Day, {
//   foreignKey: 'day_id',
// });

// Day.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// Day.hasMany(Event, {
//   foreignKey: 'day_id',
//   onDelete: 'CASCADE',
// });

// Day.belongsTo(Event, {
//   foreignKey: 'event_id',
// });

module.exports = { User, Event };
