'use strict';

var request = require('request'),
    Promise = require('promise'),
    R = require('ramda');

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

      logger.debug('sending request with headers', opts.headers);
    }

    request(opts, function (err, response, body) {
        if (err) {
          logger.debug('error raised when sending request', err);
          return reject(err);
        } else {
          return fulfill({
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
  arrivals: R.lPartial(flights, conf('FEED_ARRIVALS')),
  departures: R.lPartial(flights, conf('FEED_DEPARTURES'))
};
