const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const session = require('express-session');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// http is used by express under the hood however we want to access it directly in order to use socket.io
const http = require('http');

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const server = http.createServer(app);

// Socketio is now utilizing the server directly
const io = socketio(server);

const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Database secret',
  cookie: {
    // maxAge: 60 * 60 * 1000,
    // httpOnly: true,
    // secure: false,
    // sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// We want this to run when a user connects (signs in)
io.on('connection', (socket) => {
  // Socket.io emits a message from the backend via 'message' tag that our front end socket.io server can receive and display
  // This will emit to the single user that is connecting
  socket.emit('message', 'Welcome to Live Chat!')

  // This will broadcast when a user signs in
  // Notifies everyone besides the user
  socket.broadcast.emit('message', 'A user has joined the live chat');


  // This will broadcast when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the live chat');
  });

  // Listening for the chatMessage
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  });
  
  // This will broadcast to everyone including the user
  // Like when we send a message
  io.emit();
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  // Because we are directly using http and creating a server using express, we have to use server.listen instead of express().listen
  server.listen(PORT, () => console.log('Now listening'));
});
