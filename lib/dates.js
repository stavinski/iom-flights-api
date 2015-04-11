'use strict';

let moment = require('moment-timezone');

function formatDate(val) {
  let converted = moment.tz(new Date(val), 'GB');
  return {
    local: converted.format(),
    utc: converted.utc().format()
  };
}

module.exports = formatDate;