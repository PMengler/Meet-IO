const moment = require('moment');

module.exports = {
  // Date related methods
  format_date: (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },
  get_emoji: () => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻'];
    const index = Math.floor(Math.random() * emojis.length);
    const emoji = emojis[index];

    return `<span for="img" aria-label="emoji">${emoji}</span>`;
  },
  messageFormat: (username, text) => {
    return {
      username,
      text,
      // Moment takes the exact time and will format this into hour: minute am(pm)
      time: moment().format('h:mm a')
    }
  },
  getValues: (list) => {
    return list.map(users => users.user)
  }
}
