async function newFormHandler(event) {
  event.preventDefault();

  const event_name = document.querySelector('#event-title').value.trim();
  const description = document.querySelector('#content').value.trim();
  const start_time = document.querySelector('#start-time').value;
  const end_time = document.querySelector('#end-time').value;
  const date = document.querySelector('#event-date').value;

  if (event_name && description && start_time && end_time && date) {
    const response = await fetch(`/api/events`, {
      method: 'post',
      body: JSON.stringify({
        event_name,
        description,
        start_time,
        end_time,
        date,
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
