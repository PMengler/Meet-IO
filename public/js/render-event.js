async function renderEvents() {
  const response = await fetch('/api/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const events = await response.json();

  if (events.date) {
  }
  const eventsContainer = document.querySelector('td');
  //   eventsContainer.innerHTML = '';

  events.forEach((event) => {
    const eventContainer = document.createElement('div');
    eventContainer.classList.add('event-container');

    const title = document.createElement('p');
    title.textContent = event.event_name;

    // const user = document.createElement('p');
    // user.textContent = event.user_name;

    eventContainer.appendChild(title);
    // eventContainer.appendChild(user);

    eventsContainer.appendChild(eventContainer);
  });
}

renderEvents();
