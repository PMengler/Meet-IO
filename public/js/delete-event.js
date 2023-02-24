async function deleteFormHandler(event) {
  event.preventDefault();

  const response = await fetch(`/api/events`, {
    method: 'delete',
    body: JSON.stringify({
      event_id: event.target.id,
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
  .querySelector('.delete-button')
  .addEventListener('click', deleteFormHandler);
