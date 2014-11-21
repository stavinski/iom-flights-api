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

function format(flight) {
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

function flights(xml) {
  var parser = new xml2js.Parser({ normalizeTags: true }),
      parse = Promise.denodeify(parser.parseString),
      formatFlights = R.pipe(R.path('flights.flight'), R.map(format));

  return parse(xml).then(formatFlights, function (err) {
    // problem parsing the xml this has been because they write out invalid xml when there are no flights
    // proper info logging here log.info(err);
    return [];
  });
}

module.exports = {
  flights: flights
};
