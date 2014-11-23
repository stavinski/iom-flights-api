'use strict';

var request = require('request'),
    Promise = require('promise'),
    _ = require('lodash');

function flights(url, caching) {
  return new Promise(function (fulfill, reject) {
    var opts = {
      url: url
    };

    if (caching) {
      opts.headers = {
        'If-None-Match': caching.etag,
        'If-Modified-Since': caching.lastModified
      };
    }

    request(opts, function (err, response, body) {
        if (err) {
          reject(err);
        } else {
          fulfill({
            status: response.statusCode,
            etag: response.headers.etag,
            lastModified: response.headers['last-modified'],
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
