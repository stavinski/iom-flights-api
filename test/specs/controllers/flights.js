'use strict';

//load globals
require('../../../globals');

var sinon = require('sinon'),
    util = require('util'),
    expect = require('expect.js'),
    sut = libRequire('controllers/flights');

describe('when retrieving flight links', function () {
  var req = { protocol: 'http', get: function () { return 'localhost:3000'; } },
      res = { send: sinon.spy() };

  it('will set the correct response', function () {
    sut.index(req, res);

    expect(res.send.calledWith({
      links: {
        flights: {
          arrivals: {
            type: 'flights',
            href: 'http://localhost:3000/v1/flights/arrivals'
          },
          departures: {
            type: 'flights',
            href: 'http://localhost:3000/v1/flights/departures'
          }
        }
      }
    })).to.be.ok();
  });
});
