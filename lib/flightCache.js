'use strict';

var R = require('ramda'),
    util = require('util'),
    _cache = {};

function cache(direction) {

  function put(etag, lastModified, flights) {
    //console.log(util.format('caching: etag:[%s] last-modified:[%s] flights:\n\n%s', etag, lastModified, JSON.stringify(flights)));

    _cache[direction] = {
      etag: etag,
      lastModified: lastModified,
      flights: flights
    };
  }

  function get() {
    //console.log('cache hit for ' + direction);
    return _cache[direction];
  }

  return {
    get: get,
    put: put
  };
}

module.exports = cache;
