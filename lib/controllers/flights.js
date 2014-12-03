'use strict';

var util = require('util'),
    R = require('ramda'),
    requester = libRequire('requester'),
    formatter = libRequire('formatter'),
    flightCache = libRequire('flightCache'),
    cacheChecker = libRequire('cacheChecker');

function filter(query, flights) {
  var allowedParams = ['airline.code', 'airport.name'],
      passedParams = R.filter(R.rPartial(R.has, query), allowedParams),
      filters = R.map(function (param) {
        return R.pathEq(param, query[param]);
      }, passedParams),
      results = R.filter(R.allPredicates(filters), flights);

  return { flights: results };
}

function requestFlights(direction) {
  var cache = flightCache(direction),
      existing = cache.get();

  return requester[direction](existing).then(function (result) {
    // no changes use cached verson
    if (result.status === 304) {
      logger.info('304 using cached version');
      return {
        status: result.status,
        etag: existing.etag,
        lastModified: existing.lastModified,
        body: existing.flights
      };
    } else {
      return formatter.flights(result.body)
        .then(function (flights) {
          logger.info('200 using returned version');
          cache.put(result.etag, result.lastModified, flights);

          return {
            status: result.status,
            etag: result.etag,
            lastModified: result.lastModified,
            body: flights
          };
      });
    }
  });
}

function index(req, res) {
  var url = util.format('%s://%s', req.protocol, req.get('host'));

  res.jsonp({
    links: {
      flights: {
        arrivals: {
          type: 'flights',
          href: util.format('%s/v1/flights/arrivals', url)
        },
        departures: {
          type: 'flights',
          href: util.format('%s/v1/flights/departures', url)
        }
      }
    }
  });
}

var flights = R.curry(function flights(direction, req, res) {
  requestFlights(direction).done(function (flights) {
    var emptyParams = R.isEmpty(R.keys(req.query));

    if (emptyParams) {
      res.set({
        'ETag': flights.etag,
        'Last-Modified': flights.lastModified
      });
    }

    if (emptyParams &&
       ((req.get('If-None-Match') === flights.etag) ||
       (req.get('If-Modified-Since') === flights.lastModified))) {
      logger.info('client has up to date version sending 304');
      res.sendStatus(304);
      return;
    }

    res.jsonp(cacheChecker.check(req, filter(req.query, flights.body)));
  });
});

module.exports = {
  index: index,
  flights: flights
};
