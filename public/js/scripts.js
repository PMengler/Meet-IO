// contribution to calendar: https://github.com/niinpatel/calendarHTML-Javascript
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');
// let selectDay = document.querySelector('td').textContent;

let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

let monthAndYear = document.getElementById('monthAndYear');
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById('calendar-body'); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = '';

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + ' ' + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement('tr');

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('td');
        let cellText = document.createTextNode('');
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement('td');
        let cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add('is-warning');
        } // color today's date
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }
}

async function renderEvents() {
  const response = await fetch('/api/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  // const dateOfEvent = eventsData[0].date;
  const eventsData = await response.json();
  console.log(eventsData);

  for (let j = 0; j < eventsData.length; j++) {
    const dateOfEvent = eventsData[j].date;

    for (let i = 0; i < 31; i++) {
      const calendarDay = document.querySelectorAll('td');
      const calendarDate =
        selectYear.value +
        '-' +
        '0' +
        (parseInt(selectMonth.value) + 1) +
        '-' +
        calendarDay[i].textContent +
        'T00:00:00.000Z';

      if (calendarDate == dateOfEvent) {
        // console.log(true);
        calendarDay[i].classList.add('is-info');
      } else {
        // console.log(false);
      }
      // console.log(calendarDate);
    }
  }
}

renderEvents();

//mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  navbarMenu.classList.toggle('is-active');
});

//sql data

//doesn't work
// const sequelize = require('../../config/connection');

// sequelize.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM event", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

//doesn't work

// const sequelize = require('../../config/connection');

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//     sequelize.query('SELECT * FROM event')
//       .then(results => {
//         console.log(results);
//       })
//       .catch(err => {
//         console.error('Error executing query: ', err);
//       });
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

fetch('/api/events')
  .then((response) => response.json())
  .then((data) => {
    const eventList = document.getElementById('event-list');
    // Sort events by date in ascending order
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Reverse the order of events to show the newest events at the bottom
    data.reverse();
    // Only show the 5 upcoming events
    const upcomingEvents = data.slice(0, 5);
    upcomingEvents.forEach((event) => {
      // Check if the event date is in the future
      if (new Date(event.date) >= new Date()) {
        const eventDiv = document.createElement('div');
        const eventDate = moment(event.date).format('MMMM Do YYYY');
        eventDiv.innerHTML = `
          <h1 class="is-size-3 has-text-link">${event.event_name}</h1>
          <p>${event.description}</p>
          <p>${event.start_time} - ${event.end_time}</p>
          <p>${eventDate}</p>
        `;
        // Append each event to the top of the event list
        eventList.insertBefore(eventDiv, eventList.firstChild);
      }
    });
  })
  .catch((error) => console.error(error));

fetch('/api/events')
  .then((response) => response.json())
  .then((data) => {
    const eventList = document.getElementById('full-event-list');
    // Sort events by date in ascending order
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Reverse the order of events to show the newest events at the bottom
    data.reverse();
    data.forEach((event) => {
      const eventDiv = document.createElement('div');
      const eventDate = moment(event.date).format('MMMM Do YYYY');
      eventDiv.innerHTML = `
        <h1 class="is-size-3 has-text-link">${event.user.username} - ${event.event_name}</h1>
        <p>${event.description}</p>
        <p>${event.start_time} - ${event.end_time}</p>
        <p>${eventDate}</p>
      `;
      // Append each event to the top of the event list
      eventList.insertBefore(eventDiv, eventList.firstChild);
    });
  })
  .catch((error) => console.error(error));
