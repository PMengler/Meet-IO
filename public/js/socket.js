const chatForm = document.getElementById('chat-form');

const socket = io();

// Socket picks up on the backend server via 'message' tag and displays the message from our backend server
socket.on('message', (msg) => {
    console.log(`New message: ${msg}`)
    outputMessage(msg);
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const msg = event.target.elements.msg.value;

    // Sending message for server to pick up on
    socket.emit('chatMessage', msg);
});

// Output the message to the DOM
outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p> Sample User </p>
    <p class='text'> ${message}</p>`
    document.querySelector('.chat-msg').appendChild(div);

    return message;
}