'use strict';

var util = require('util'),
    requester = libRequire('requester'),
    formatter = libRequire('formatter'),
    flightCache = libRequire('flightCache');

function index(req, res) {
  var url = util.format('%s://%s', req.protocol, req.get('host'));

  res.send({
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

function flights(req, res) {
  res.set({
    'ETag': req.flights.etag,
    'Last-Modified': req.flights.lastModified
  });

  if ((req.get('If-None-Match') === req.flights.etag) ||
     (req.get('If-Modified-Since') === req.flights.lastModified)) {
    res.sendStatus(304);
    return;
  }

  res.send(req.flights.body);
}

function direction(req, res, next, dir) {
  if ((dir !== 'arrivals') && (dir !== 'departures')) {
    res.send(404);
    return;
  }

  var cache = flightCache(dir),
      existing = cache.get();

  requester[dir](existing).then(function (result) {

    // no changes use cached verson
    if (result.status === 304) {
      console.log('304 using cached version');
      req.flights = {
        status: result.status,
        etag: existing.etag,
        lastModified: existing.lastModified,
        body: existing.flights
      };

      next();
      return;
    }

    formatter.flights(result.body)
            .then(function (flights) {
              console.log('200 using returned version');
              cache.put(result.etag, result.lastModified, flights);

              req.flights = {
                status: result.status,
                etag: result.etag,
                lastModified: result.lastModified,
                body: flights
              };

              next();
            });
  }, next);
}

module.exports = {
  index: index,
  flights: flights,
  direction: direction
};
