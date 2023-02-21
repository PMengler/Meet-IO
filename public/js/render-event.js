for (var i = 0; i < 31; i++) {
  const calendarDay = document.querySelectorAll('td');
  console.log(JSON.stringify(calendarDay[i].textContent));
}

async function renderEvents() {
  const response = await fetch('/api/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const eventsData = await response.json();

  eventsData.forEach((event) => {
    console.log(event.date);
    if (event.date === today) {
      calendarDay.classList.add('is-warning');
    }
  });
}

renderEvents();
