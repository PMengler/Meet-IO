const router = require('express').Router();
const { messageFormat, getValues } = require('../../utils/helpers');

// The key is to grab the current user based off the session id and bounce the data from the front end to the backend

module.exports = function async(io) {
    // Adding constant that will represent our chat bot name
    const chatBot = 'Bot-Io';

    // Add a new variable that will add users based on when they join in
    const loggedUsers = []

    // We want this to run when a user connects (signs in)
    io.on('connection', (socket) => {
        socket.on('joinedUser', (user) => {
            if (!getValues(loggedUsers).includes(user)) {
                loggedUsers.push({
                    user: user
                });
            } else {
                return
            }

            io.emit('loggedUsers', Object.values(loggedUsers[0]));

            socket.emit('message', messageFormat(chatBot, `Welcome to Live Chat ${user}!`));
            // Socket.io emits a message from the backend via 'message' tag that our front end socket.io server can receive and display
            // This will emit to the single user that is connecting

            // This will broadcast when a user signs in
            // Notifies everyone besides the user
            socket.broadcast.emit('message', messageFormat(chatBot, `${user} has joined the live chat`));
        });

        //

        // This will broadcast when a user disconnects
        socket.on('disconnect', (user) => {
            io.emit('message', messageFormat(chatBot, `${user} has left the live chat`));
        });


        // Listening for the chatMessage
        socket.on('chatMessage', (msg) => {
            io.emit('message', messageFormat('sample', msg));
        });

        // This will broadcast to everyone including the user
        // Like when we send a message
        io.emit();
    });

    return router;

}