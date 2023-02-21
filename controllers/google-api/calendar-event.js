// Create a calendar event

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
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
  