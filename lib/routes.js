'use strict';

var flights = require('./controllers/flights');

function routesV1(router) {
  router.get('/flights', flights.flights);

}

module.exports = {
  v1: routesV1
};
