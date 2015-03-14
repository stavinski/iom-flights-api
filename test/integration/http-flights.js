'use strict';

var request = require('supertest'),
    util = require('util'),
    expect = require('expect.js');

function flightsSpec (direction) {
  describe('when requesting ' + direction, function () {
    var url;

    beforeEach(function () {
      // load the globals
      require('../../globals');
      url = util.format('%s:%d', conf('HOST'), conf('PORT'));
    });

    it('should return response', function (done) {
      request(url)
        .get('/v1/flights/' + direction)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;

          expect(res.body).to.have.property('updated');
          expect(res.body).to.have.property('flights');
          
          done();
        });
    });
  });
}

// test both directions
flightsSpec('arrivals');
flightsSpec('departures');