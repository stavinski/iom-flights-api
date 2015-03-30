'use strict';

let expect = require('expect.js');

require('co-mocha');

describe('when making request', () => {
  let requester;

  beforeEach(() => {
    require('../../globals');

    requester = libRequire('requester');
  });

  it('should return correct structure', function* () {
    let result = yield requester('http://www.google.com/');
    expect(result).to.have.property('status');
    expect(result).to.have.property('etag');
    expect(result).to.have.property('updated');
    expect(result).to.have.property('body');
  });

  it('should return a correct response', function* () {
    let result = yield requester('http://www.google.com/');
    expect(result.status).to.be(200);
  });

});