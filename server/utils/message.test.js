const expect = require('expect');
let { generateMessage } = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message', () => {
    let message = generateMessage('bob', 'testing123');

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from: 'bob', message: 'testing123' });
  });

});