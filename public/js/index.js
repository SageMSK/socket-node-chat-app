$(document).ready(function () {
  const socket = io();

  socket.on('connect', function () {
    console.log('Connected to server');
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });
  
  socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
      message: message.message,
      from: message.from,
      createdAt: formattedTime
    });

    $('#messages').append(html);
  });

  socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let locationMessageTemplate = $('#location-message-template').html();
    let html = Mustache.render(locationMessageTemplate, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });

    $('#messages').append(html);
  });


  // ================================================
  //                jQuery commands
  // ================================================
  $('#message-form').on('submit', function (e) {
    e.preventDefault();
    let messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
      from: 'User',
      message: messageTextBox.val()
    }, function (data) {
      messageTextBox.val(''); // reset
    });
  });

  let locationButton = $('#send-location');
  locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send Location');

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location.'); // Need permission
    });
  });

});