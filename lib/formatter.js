'use strict';

var xml2js = require('xml2js'),
    _ = require('lodash'),
    Promise = require('promise');

function optional(obj, key, val) {
  if (!_.isEmpty(val)) {
    obj[key] = val;
  }
}

function format(flight) {
  var formatted = {
    id: _.first(flight.flt),
    type: 'flight',
    airport: {
      name: _.first(flight.port),
      fullname: _.first(flight.full_port)
    },
    airline: {
      code: _.first(flight.airline_code),
      name: _.first(flight.airline_name)
    }
  };

  optional(formatted, 'scheduled', _.first(flight.sched_datetime));
  optional(formatted, 'expected', _.first(flight.expected_datetime));
  optional(formatted, 'actual', _.first(flight.actual_datetime));
  optional(formatted, 'status', _.first(flight.status));

  return formatted;
}

function flights(xml) {
  var parser = new xml2js.Parser({ normalizeTags: true }),
      parse = Promise.denodeify(parser.parseString);

  return parse(xml).then(function (data) {
    return _.map(data.flights.flight, format);
  }, function (err) {
    // problem parsing the xml this has been because they write out invalid xml when there are no flights
    //console.error(err);
    return [];
  });
}

module.exports = {
  flights: flights
};
