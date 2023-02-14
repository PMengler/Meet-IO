async function newFormHandler(event) {
  event.preventDefault();

  const eventDate = document.querySelector('input[name="event-date"]').value;
  const startTime = document.querySelector('input[name="start-time"]').value;
  const endTime = document.querySelector('input[name="end-time"]').value;
  const title = document.querySelector('input[name="event-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  const response = await fetch(`/api/events`, {
    method: 'POST',
    body: JSON.stringify({
      eventDate,
      startTime,
      endTime,
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('#new-event-form')
  .addEventListener('submit', newFormHandler);
