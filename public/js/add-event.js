async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="event-title"]').value;
  const content = document.querySelector('input[name="content"]').value;
  const start_time = document.querySelector('input[name="start-time"]').value;
  const end_time = document.querySelector('input[name="end-time"]').value;
  const date = document.querySelector('input[name="event-date"]').value;

  const response = await fetch(`/api/events`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
      start_time,
      end_time,
      date,
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
