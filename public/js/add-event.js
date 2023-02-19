const sequelize = require('../../config/connection');

async function newFormHandler(event) {
  event.preventDefault();

  const event_name = document.querySelector('#event-title').value.trim();
  const description = document.querySelector('#content').value.trim();
  const start_time = document.querySelector('#start-time').value;
  const end_time = document.querySelector('#end-time').value;
  const date = document.querySelector('#event-date').value;
  const user_id = 2;

  if (event_name && description && start_time && end_time && date && user_id) {
    const response = await fetch(`/api/events`, {
      method: 'post',
      body: JSON.stringify({
        event_name,
        description,
        start_time,
        end_time,
        date,
        user_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log(response);
      document.location.replace('/api/events');
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.new-event-button')
  .addEventListener('click', newFormHandler);
