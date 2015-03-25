'use strict';

var util = require('util');

function* index(next) {
  const url = util.format('%s://%s', this.protocol, this.host);

  this.body = {
    links: {
      flights: {
        arrivals: { type: 'flight', href: util.format('%s/v1/flights/arrivals', url) },
        departures: { type: 'flight', href: util.format('%s/v1/flights/departures', url) },
      }
    }
  };

  yield next;
}

function* arrivals(next) {
  this.body = { updated: new Date(), flights: [] };

  yield next;
}

function* departures(next) {
  this.body = { updated: new Date(), flights: [] };

  yield next;
}

module.exports = requester => { return {
    index: index,
    arrivals: arrivals,
    departures: departures
  };
};