'use strict';

var R = require('ramda'),
    util = require('util'),
    _cache = {};

function cache(direction) {

  function put(etag, lastModified, flights) {
    logger.debug(util.format('caching: etag:[%s] last-modified:[%s] flights:\n\n%s', etag, lastModified, JSON.stringify(flights)));

    _cache[direction] = {
      etag: etag,
      lastModified: lastModified,
      flights: flights
    };
  }

  function get() {
    logger.debug('cache hit for ' + direction);
    return _cache[direction];
  }

  return {
    get: get,
    put: put
  };
}

module.exports = cache;
