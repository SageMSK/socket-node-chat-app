$(document).ready(function () {
  const socket = io();

  socket.on('connect', function () {
    console.log('Connected to server');
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });
  
  socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.message}`);

    $('#messages').append(li);
  });

  $('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      message: $('[name=message]').val()
    }, function (data) {
      console.log('Got it!', data)
    });

    $('[name=message]').val(''); // reset
  });

});