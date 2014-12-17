'use strict';

var xml2js = require('xml2js'),
    R = require('ramda'),
    Promise = require('promise'),
    util = require('util'),
    dates = require('./dates');

function optional(obj, key, val) {
  var cloned = R.cloneObj(obj);
  if (!R.isEmpty(val)) {
    cloned[key] = val;
  }

  return cloned;
}

function formatDate(val) {
  if (R.isEmpty(val)) return;

  var converted = dates.parse(val);
  return {
    local: dates.toLocalISOString(converted),
    utc: converted.toISOString()
  };
}

function formatFlight(flight) {
  var formatted = {
    id: R.head(flight.flt),
    type: 'flight',
    airport: {
      name: R.head(flight.port),
      fullname: R.head(flight.full_port)
    },
    airline: {
      code: R.head(flight.airline_code),
      name: R.head(flight.airline_name)
    }
  };

  formatted = optional(formatted, 'scheduled', formatDate(R.head(flight.sched_datetime)));
  formatted = optional(formatted, 'expected', formatDate(R.head(flight.expected_datetime)));
  formatted = optional(formatted, 'actual', formatDate(R.head(flight.actual_datetime)));
  formatted = optional(formatted, 'status', R.head(flight.status));

  return formatted;
}

function formatResponse(data) {
  var updated = R.pipe(R.path('flights.updated_at'), dates.parse),
      flights = R.pipe(R.path('flights.flight'), R.map(formatFlight));

  return {
    success: true,
    updated: updated(data),
    flights: flights(data)
  };
}

function flights(xml) {
  var parser = new xml2js.Parser({ normalizeTags: true }),
      parse = Promise.denodeify(parser.parseString);

  return parse(xml).then(formatResponse, function (err) {
    // problem parsing the xml this has been because they write out invalid xml when there are no flights
    logger.debug('error formatting flights', err);
    return { success: false };
  });
}

module.exports = {
  flights: flights
};
