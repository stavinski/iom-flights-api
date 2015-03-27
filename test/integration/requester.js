'use strict';

let co = require('co'),
    expect = require('expect.js');

describe('when making request', () => {
  let requester;

  beforeEach(() => {
    require('../../globals');

    requester = libRequire('requester');
  });

  it('should return correct response', (done) => {
    co(function* () {
      let result = yield requester('http://www.google.com/');
      expect(result.status).to.be(200);
      done();
    });
  });

});