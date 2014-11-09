'use strict';

var request = require('supertest'),
    util = require('util'),
    expect = require('expect.js');

describe('when requesting index', function () {
  var url;

  beforeEach(function () {
    // load the globals
    require('../../lib/globals');
    url = util.format('%s:%d', conf('HOST'), conf('PORT'));
  });

  it('will return links in response', function (done) {
    request(url)
      .get('/v1/flights')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;

        expect(res.body.links.flights.arrivals.href).to.be(util.format('%s/v1/flights/arrivals', url));
        expect(res.body.links.flights.departures.href).to.be(util.format('%s/v1/flights/departures', url));

        done();
      });
  });

});
