'use strict';

var util = require('util'),
    request = require('supertest'),
    expect = require('expect.js');

describe('when retrieving flights', () => {
  var url;

  beforeEach(() => {
    require('../../globals');
    url = util.format('%s:%d', conf('HOST'), conf('PORT'));
  });

  it('should return flights available', done => {
    const expectedArrivals = util.format('%s/v1/flights/arrivals', url);
    const expectedDepartures = util.format('%s/v1/flights/departures', url);

    request(url)
      .get('/v1/flights')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body.links.flights.arrivals.href).to.be(expectedArrivals);
        expect(res.body.links.flights.departures.href).to.be(expectedDepartures);

        done();
      });
  });

  it('should return arrivals', done => {
    request(url)
      .get('/v1/flights/arrivals')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.have.property('updated');
        expect(res.body).to.have.property('flights');

        done();
      });
  });

  it('should return departures', done => {
    request(url)
      .get('/v1/flights/departures')
      .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.have.property('updated');
        expect(res.body).to.have.property('flights');

        done();
      });
  });
});