'use strict';

let util = require('util'),
    _ = require('lodash'),
    co = require('co'),
    requester = libRequire('requester'),
    formatter = libRequire('formatter');

let directions = {
  ARRIVALS: 'arrivals',
  DEPARTURES: 'departures'
};

let responses = {
  OK: 200,
  NOT_MODIFIED: 304,
  INTERNAL_ERROR: 500
};

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

function flights(direction, datafeed) {
  return function* retrieveFlights(next) {
    let etag = this.get('if-none-match');
    let response = yield requester(datafeed, etag);
    let updated = new Date(response.updated);
    this.etag = response.etag;

    logger.debug('received response', response);

    if (response.status === responses.NOT_MODIFIED) { // the client already has the up to date version
      logger.debug(util.format('%s data feed returned %d', direction, responses.NOT_MODIFIED));
      this.status = responses.NOT_MODIFIED;
    } else if (response.status === responses.OK) { // ok response
      let flights = yield formatter(response.body);
      this.status = responses.OK;
      this.body = { updated: updated, flights: flights };
    } else { // bad response
      logger.error('received error response', response.status);
      this.throw(responses.INTERNAL_ERROR);
    }

    yield next;
  };
}

module.exports = {
  index: index,
  arrivals: flights(directions.ARRIVALS, conf('FEED_ARRIVALS')),
  departures: flights(directions.DEPARTURES, conf('FEED_DEPARTURES'))
};