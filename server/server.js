const path                = require('path');
const http                = require('http');
const express             = require('express');
const socketIO            = require('socket.io');

const publicPath          = path.join(__dirname, '../public');
const app                 = express();
const PORT                = process.env.PORT || 3000;
const server              = http.createServer(app);
const io                  = socketIO(server);
const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected. Nodejs');


  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.emit('newUser', message => {
    io.emit('newMessage', generateMessage(message.from, message.message));
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.message));
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

// https://frozen-atoll-24227.herokuapp.com/
server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
});