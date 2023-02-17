<<<<<<< HEAD
=======
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-msg');
const usernamePlacement = document.getElementById('username-placement').textContent;

>>>>>>> main
const socket = io();

// User joining

// This is on the right track where the front end can recieve information however it might be a good way to create an endpoint that accesses current user based on session id

// Socket picks up on the backend server via 'message' tag and displays the message from our backend server
socket.on('message', (msg) => {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(msg);
});
=======
    console.log(`New message: ${msg}`)
=======
>>>>>>> main
    outputMessage(msg);

    // Scroll down function
    chatMessages.scrollTop =chatMessages.scrollHeight;
});

socket.emit('joinedUser', usernamePlacement)

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const msg = event.target.elements.msg.value;

    // Sending message for server to pick up on
    socket.emit('chatMessage', msg);

    // Clear the input after send
    event.target.elements.msg.value = '';

    //Focus adds a small highlight to the input
    event.target.elements.msg.focus();
});

// Output the message to the DOM
// Since the helper function turns the response into an object, we have to use the key value pairs to show the messages
outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p> ${message.username} ${message.time}</p>
    <p class='text'> ${message.text}</p>`
    document.querySelector('.chat-msg').appendChild(div);
<<<<<<< HEAD

    return message;
}
>>>>>>> main
=======
}
>>>>>>> main
