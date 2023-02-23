// Create a calendar event
// Import dayjs
import dayjs from 'dayjs';
const dayjs = require('dayjs')
dayjs().format()
// Assumes users timezone
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()

const event = {
    'summary': '',
    'location': '',
    'description': '',
    'start': {
      'dateTime': '',
      'timeZone': '',
    },
    'end': {
      'dateTime': '',
      'timeZone': '',
    },
    'recurrence': [
      'RRULE:FREQ=;COUNT='
    ],
    'attendees': [
      {'email': ''},
      {'email': ''},
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  
  calendar.event.insert({
    calendarId: 'primary',
    resource: calendar.event,
    description: '',
    start : {
      dateTime: new Date().setSeconds(24 * 60 * 60),
    }
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
  