const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-msg');
const updateUserList = document.querySelector('.update-users');
const joinedUser = document.getElementById('current-user').textContent.trim();

const socket = io();


socket.on('joinedMessage', (msg) => {
    joinedMessage(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
})
// Socket picks up on the backend server via 'message' tag and displays the message from our backend server
socket.on('message', (msg) => {
    outputMessage(msg);

    // Scroll down function
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Displays the currently logged in users
socket.on('loggedUsers', (users) => {
    users.forEach(username => {
        outputCurrentUserList(username.user);
    });
});

socket.emit('joinedUser', joinedUser)

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const msg = event.target.elements.msg.value;

    // Sending message for server to pick up on
    socket.emit('chatMessage', msg, joinedUser);

    // Clear the input after send
    event.target.elements.msg.value = '';

    //Focus adds a small highlight to the input
    event.target.elements.msg.focus();
});

updateUserList.addEventListener('click', () => {
    socket.emit('joinedUser', joinedUser);

})
// Output the message to the DOM
// Since the helper function turns the response into an object, we have to use the key value pairs to show the messages
outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p>${message.username} ${message.time}</p>
    <p class='text'>${message.text}</p>`
    document.querySelector('.chat-msg').appendChild(div);
}

joinedMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p>${message.username} ${message.time}</p>
    <p class='text joined-text'>${message.text}</p>`
    document.querySelector('.chat-msg').appendChild(div);
}

outputCurrentUserList = (users) => {
    const div = document.createElement('div');
    div.classList.add('online');
    div.innerHTML = `<p class="user">${users}</p>`
    document.querySelector('.online-users').appendChild(div);

    
}

reloadUserList = () => {
    socket.emit('reloadUsers', joinedUser)
}