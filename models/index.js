const User = require('./User');
const Event = require('./Event');
<<<<<<< HEAD
<<<<<<< HEAD
=======
const Day = require('./Day');

>>>>>>> main
=======
// const Day = require('./Day');
>>>>>>> main

User.hasMany(Event, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Event.belongsTo(User, {
<<<<<<< HEAD
  foreignKey: 'event_id',
});

<<<<<<< HEAD
module.exports = { User, Event };
=======
Day.hasMany(Event, {
  foreignKey: 'day_id',
  onDelete: 'CASCADE',
});

Event.belongsTo(Day, {
  foreignKey: 'day_id',
});

User.hasMany(Day, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Day.belongsTo(User, {
=======
>>>>>>> main
  foreignKey: 'user_id',
});

// Event.belongsToMany(User, {
//   through: 'event_user',
//   foreignKey: 'event_id',
//   onDelete: 'CASCADE',
// });

<<<<<<< HEAD
module.exports = { User, Event, Day };
>>>>>>> main
=======
// User.hasMany(Day, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Day.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// Event.belongsTo(Day, {
//   foreignKey: 'day_id',
// });

// Day.hasMany(Event, {
//   foreignKey: 'day_id',
// });

module.exports = { User, Event };
>>>>>>> main
