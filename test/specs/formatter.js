'use strict';

let co = require('co'),
    expect = require('expect.js'),
    _ = require('lodash');

describe('when formatting flights xml', () => {
  let formatter;
  let xmldata = {
    good: '<FLIGHTS><UPDATED_AT>09 Nov 2014 10:03</UPDATED_AT><FLIGHT><FLT>BE811</FLT><PORT>Manchester</PORT><VIA1/><VIA2/><FULL_PORT>Manchester</FULL_PORT><AIRLINE_CODE>BE</AIRLINE_CODE><AIRLINE_NAME>Flybe</AIRLINE_NAME><SCHED_DATETIME>09 Nov 2014 10:45</SCHED_DATETIME><SCHED_TIME>10:45</SCHED_TIME><EXPECTED_DATETIME/><EXPECTED_TIME/><ACTUAL_DATETIME/><ACTUAL_TIME/><STATUS>Go to Gate 3</STATUS><_order>11/9/2014 10:45:00 AM</_order></FLIGHT></FLIGHTS>',
    bad: '<FLIGHTS><UPDATED_AT>08 Nov 2014 21:55</UPDATED_AT>'
  };

  beforeEach(() => {
    require('../../globals');

    formatter = libRequire('formatter');
  });

  it('should return correct number of flights', done => {
    co(function* () {
      try {
        let flights = yield formatter(xmldata.good);
        expect(flights).to.have.length(1);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should have correct structure', done => {
    co(function* () {
      try {
        let flights = yield formatter(xmldata.good);
        let flight = _.first(flights);

        expect(flight).to.have.property('id');
        expect(flight).to.have.property('type');
        expect(flight).to.have.property('airport');
        expect(flight.airport).to.have.property('name');
        expect(flight.airport).to.have.property('fullname');
        expect(flight).to.have.property('airline');
        expect(flight.airline).to.have.property('code');
        expect(flight.airline).to.have.property('name');
        expect(flight).to.have.property('scheduled');
        //expect(flight.scheduled).to.have.property('local');
        //expect(flight.scheduled).to.have.property('utc');

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should have correct values', done => {
    co(function* () {
      try {
        let flights = yield formatter(xmldata.good);
        let flight = _.first(flights);

        expect(flight).to.eql({
          id: 'BE811',
          type: 'flight',
          airport: {
            name: 'Manchester',
            fullname: 'Manchester'
          },
          airline: {
            code: 'BE',
            name: 'Flybe'
          },
          scheduled: {
            local: '2014-11-09T10:45:00',
            utc: '2014-11-09T10:45:00.000Z'
          },
          status: 'Go to Gate 3'
        });

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should handle bad data', done => {
    co(function* () {
      try {
        let flights = yield formatter(xmldata.bad);
        expect(flights).to.be.empty();
        done();
      } catch (err) {
        done(err);
      }
    });
  });

});
