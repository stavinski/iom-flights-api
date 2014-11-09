'use strict';

var util = require('util');

function flights(req, res) {
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

module.exports = {
  flights: flights
};
