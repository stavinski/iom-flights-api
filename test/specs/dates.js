'use strict';

//load globals
require('../../globals');

var expect = require('expect.js'),
    sut = libRequire('dates.js');

describe('when formatting a date to local ISO string', function () {

  it('should handle a normal GMT datetime', function () {
    var val = new Date('01 Nov 2014 10:00:00'),
        result = sut.toLocalISOString(val);

    expect(result).to.be('2014-11-01T10:00:00');
  });

  it('should handle a DST datetime', function () {
    var val = new Date('01 Aug 2014 10:00:00'),
        result = sut.toLocalISOString(val);

    expect(result).to.be('2014-08-01T10:00:00');
  });

});
