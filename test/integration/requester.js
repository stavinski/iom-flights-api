'use strict';

let co = require('co'),
    expect = require('expect.js');

describe('when making request', () => {
  let requester;

  beforeEach(() => {
    require('../../globals');

    requester = libRequire('requester');
  });

  it('should return correct structure', (done) => {
    co(function* () {
      let result = yield requester('http://www.google.com/');
      expect(result).to.have.property('status');
      expect(result).to.have.property('etag');
      expect(result).to.have.property('updated');
      expect(result).to.have.property('body');
      done();
    });
  });

  it('should return a correct response', done => {
    co(function* () {
      let result = yield requester('http://www.google.com/');
      expect(result.status).to.be(200);

      done();
    });
  });

});