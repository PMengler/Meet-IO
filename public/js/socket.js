const chatForm = document.getElementById('chat-form');

const socket = io();

// Socket picks up on the backend server via 'message' tag and displays the message from our backend server
socket.on('message', (msg) => {
    console.log(msg);
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const msg = event.target.elements.msg.value;

    console.log(msg);
});