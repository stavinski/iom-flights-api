'use strict';

var request = require('request'),
    Promise = require('promise'),
    _ = require('lodash');

function flights(url) {
  return new Promise(function (fulfill, reject) {
    request(url, function (err, response, body) {
        if (err) {
          reject(err);
        } else {
          fulfill({
            response: response,
            body: body
          });
        }
    });
  });
}

module.exports = {
  arrivals: _.partial(flights, conf('FEED_ARRIVALS')),
  departures: _.partial(flights, conf('FEED_DEPARTURES'))
};
