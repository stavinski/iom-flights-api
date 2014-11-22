'use strict';

var util = require('util'),
    requester = libRequire('requester');

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
  res.send(200);
}

function direction(req, res, next, dir) {
  if ((dir !== 'arrivals') && (dir !== 'departures')) {
    res.send(404);
    return;
  }

  requester[dir]().then(function (flights) {
    req.flights = flights;
    next();
  }, next);
}

module.exports = {
  index: index,
  flights: flights,
  direction: direction
};
