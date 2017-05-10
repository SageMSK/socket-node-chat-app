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

  socket.on('newLocationMessage', function (message) {
    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    $('#messages').append(li);
  })


  // ================================================
  //                jQuery commands
  // ================================================
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

  let locationButton = $('#send-location');
  locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      alert('Unable to fetch location.'); // Need permission
    });
  });

});