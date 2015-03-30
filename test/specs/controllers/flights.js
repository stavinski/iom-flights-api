'use strict';

require('../../../globals');

let _ = require('lodash'),
    expect = require('expect.js'),
    sinon = require('sinon'),
    controller = libRequire('controllers/flights');

let ctx = {
  protocol: 'http',
  host: 'localhost:3000',
  body: {},
  etag: ''
};

describe('when retrieving available flights', () => {
  it('should return correct response', () => {
    let gen = controller.index.call(ctx, Function.prototype);
    gen.next();
    gen.next();

    expect(ctx.body.links.flights.arrivals.href).to.be('http://localhost:3000/v1/flights/arrivals');
    expect(ctx.body.links.flights.departures.href).to.be('http://localhost:3000/v1/flights/departures');
  });
});

function flightSpecification(direction) {

  describe('when retrieving ' + direction, () => {
    let response = {
      updated: 'Sat, 28 Mar 2015 13:45:19 GMT',
      status: 304,
      etag: 'abc123',
      body: '<FLIGHTS></FLIGHTS>'
    };

    let flights = [{
      "id":"BE181",
      "type":"flight",
      "airport": {
        "name":"Geneva",
        "fullname":"Geneva"
      },
      "airline": {
        "code":"BE",
        "name":"Flybe"
      },"scheduled": {
        "local":"2015-03-28T09:50:00",
        "utc":"2015-03-28T09:50:00.000Z"
      },
      "expected": {
        "local":"2015-03-28T13:05:00",
        "utc":"2015-03-28T13:05:00.000Z"
      },
      "actual": {
        "local":"2015-03-28T13:15:00",
        "utc":"2015-03-28T13:15:00.000Z"
      },
      "status":"Departed 13:15"
    }];

    beforeEach(() => {
      ctx.get = sinon.spy();
      ctx.throw = sinon.spy();
    });

    it('should use the if-none-match header', () => {
      let gen = controller[direction].call(ctx, Function.prototype);
      gen.next();
      gen.next(response);

      expect(ctx.get.calledWith('if-none-match')).to.be.ok();
    });

    it('should use the etag header', () => {
      let gen = controller[direction].call(ctx, Function.prototype);
      gen.next();
      gen.next(response);

      expect(ctx.etag).to.be('abc123');
    });

    describe('given requester returns not modified status', () => {
      it('should return not modified status to the client', () => {
        let gen = controller[direction].call(ctx, Function.prototype);
        gen.next();
        gen.next(response);

        expect(ctx.status).to.be(304);
      });
    });

    describe('given requester returns bad status', () => {
      beforeEach(() => response.status = 500);

      it('should throw a bad status', () => {
        let gen = controller[direction].call(ctx, Function.prototype);
        gen.next();
        gen.next(response);

        expect(ctx.throw.calledWith(500)).to.be.ok();
      });
    });

    describe('given requester returns ok status', () => {
      beforeEach(() => response.status = 200);

      it('should return updated to the client', () => {
        let gen = controller[direction].call(ctx, Function.prototype);
        gen.next();
        gen.next(response);
        gen.next(flights);

        expect(ctx.body.updated).to.eql(new Date('Sat, 28 Mar 2015 13:45:19 GMT'));
      });

      it('should return flights to the client', () => {
        let gen = controller[direction].call(ctx, Function.prototype);
        gen.next();
        gen.next(response);
        gen.next(flights);

        let expected = _.first(flights);
        let flight = _.first(ctx.body.flights);
        expect(flight).to.eql(expected);
      });
    });
  });
}

flightSpecification('arrivals');
flightSpecification('departures');