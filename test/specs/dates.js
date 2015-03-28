'use strict';

//load globals
require('../../globals');

let expect = require('expect.js'),
    dates = libRequire('dates');

describe('when formatting a date to local ISO string', function () {

  beforeEach(() => dates());

  it('should handle a normal GMT datetime', function () {
    let val = new Date('01 Nov 2014 10:00:00'),
        result = val.toLocalISOString();

    expect(result).to.be('2014-11-01T10:00:00');
  });

  it('should handle a DST datetime', function () {
    let val = new Date('01 Aug 2014 10:00:00'),
        result = val.toLocalISOString();

    expect(result).to.be('2014-08-01T10:00:00');
  });

});