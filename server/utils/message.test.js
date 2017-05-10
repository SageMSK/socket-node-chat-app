const expect = require('expect');
let { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message', () => {
    let message = generateMessage('bob', 'testing123');

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from: 'bob', message: 'testing123' });
  });

});

describe('generateLocationMessage', () => {

  it('should generate the correct location url', () => {
    let locationMessage = generateLocationMessage('bob', 1, 1);
    let url = 'https://www.google.com/maps?q=1,1';

    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage).toInclude({ from: 'bob', url });
  });

});