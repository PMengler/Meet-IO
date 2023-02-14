const socket = io();

// Socket picks up on the backend server via 'message' tag and displays the message from our backend server
socket.on('message', (msg) => {
    console.log(msg);
});