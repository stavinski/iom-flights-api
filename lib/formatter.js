'use strict';

let co = require('co'),
    _ = require('lodash'),
    xml2js = require('xml2js'),
    Parser = xml2js.Parser,
    dates = libRequire('dates');

// initialise the Date extensions
dates();

function read(xml) {
  let parser = new Parser({ normalizeTags: true });

  return new Promise((fulfill, reject) => {
    parser.parseString(xml, (err, data) => {
      if (err) {
        reject(err);
      } else {
        fulfill(data);
      }
    });
  });
}

function optional(obj, key, val) {
  let cloned = _.clone(obj);
  if (!_.isEmpty(val)) {
    cloned[key] = val;
  }

  return cloned;
}

function formatDate(val) {
  if (_.isEmpty(val)) {
    return;
  }

  let converted = new Date(val);

  return {
    local: converted.toLocalISOString(),
    utc: converted.toISOString()
  };
}

function formatFlight(flight) {
  let get = _.flow(_.propertyOf(flight), _.first);
  let getDate = _.flow(get, formatDate);
  let formatted = {
    id: get('flt'),
    type: 'flight',
    airport: {
      name: get('port'),
      fullname: get('full_port')
    },
    airline: {
      code: get('airline_code'),
      name: get('airline_name'),
    }
  };

  formatted = optional(formatted, 'scheduled', getDate('sched_datetime'));
  formatted = optional(formatted, 'expected', getDate('expected_datetime'));
  formatted = optional(formatted, 'actual', getDate('actual_datetime'));
  formatted = optional(formatted, 'status', get('status'));

  return formatted;
}

function format(xml) {
  return co(function* formatFlights() {
    try {
      let parsed = yield read(xml);
      return _.map(parsed.flights.flight, formatFlight);
    } catch (err) {
      // sometimes the data feed brings back invalid xml
      // so we can handle it here and return zero flights
      logger.debug('error formatting flights', err);
      return [];
    }
  });
}

module.exports = format;