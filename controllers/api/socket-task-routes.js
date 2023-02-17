const router = require('express').Router();
const { messageFormat } = require('../../utils/helpers');

// The key is to grab the current user based off the session id and bounce the data from the front end to the backend

module.exports = function (io) {
    // Adding constant that will represent our chat bot name
    const chatBot = 'Bot-Io';

    // We want this to run when a user connects (signs in)
    io.on('connection', (socket) => {
        socket.on('joinedUser', () => {
            socket.emit('message', messageFormat(user.username, 'test welcome'))
        })
        // Socket.io emits a message from the backend via 'message' tag that our front end socket.io server can receive and display
        // This will emit to the single user that is connecting
        socket.emit('message', messageFormat(chatBot, 'Welcome to Live Chat!'))

        // This will broadcast when a user signs in
        // Notifies everyone besides the user
        socket.broadcast.emit('message', messageFormat(chatBot, `A user has joined the live chat`));

        // This will broadcast when a user disconnects
        socket.on('disconnect', () => {
            io.emit('message', messageFormat(chatBot, 'A user has left the live chat'));
        });

        // Listening for the chatMessage
        socket.on('chatMessage', (msg) => {
            io.emit('message', messageFormat('Sample User', msg));
        });

        // This will broadcast to everyone including the user
        // Like when we send a message
        io.emit();
    });

    return router;
}