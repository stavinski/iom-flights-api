'use strict';

var flights = require('./controllers/flights'),
    caching = require('./controllers/caching');

function routesV1(router) {

  // flights
  router.get('/flights', flights.index);
  router.get('/flights/arrivals', flights.flights('arrivals'));
  router.get('/flights/departures', flights.flights('departures'));

  // caching
  router.get('/caching', caching.index);
}

module.exports = {
  v1: routesV1
};
