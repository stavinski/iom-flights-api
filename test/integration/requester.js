'use strict';

var co = require('co'),
    expect = require('expect.js');

describe('when making request', () => {
  var requester;

  beforeEach(() => {
    require('../../globals');

    requester = libRequire('requester');
  });

  it('should return correct response', (done) => {
    co(function* () {
      var result = yield requester('http://www.google.com/');
      expect(result.status).to.be(200);
      done();
    });
  });

});