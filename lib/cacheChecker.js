'use strict';

var util = require('util'),
    R = require('ramda');

// :: object -> boolean
var missingMatch = R.pipe(R.rPartial(R.func('get'), 'if-none-match'), R.eq(undefined));

// :: object -> boolean
var missingModified = R.pipe(R.rPartial(R.func('get'), 'if-modified-since'), R.eq(undefined));

// :: object -> boolean
var missingRequiredHeaders = R.allPredicates([missingMatch, missingModified]);

// :: object -> string
var baseUrl = R.rPartial(R.func('get'), 'host');

// :: object -> string
var protocol = R.prop('protocol');

// :: string -> * -> string
var format = function (val) {
  return function _format() {
    return util.format.apply(this, R.prepend(val, arguments));
  };
};

// :: * -> string
var url = format('%s://%s');

// :: * -> string
var cachingPath = format('%s/v1/caching');

function check(req, obj) {
  // :: a -> b
  var cachingMeta = R.assoc('meta', R.createMapEntry('caching', cachingPath(url(protocol(req), baseUrl(req)))));

  // :: object -> object
  var cacheCheck = R.ifElse(missingRequiredHeaders, R.lPartial(cachingMeta, obj), R.always(obj));

  return cacheCheck(req);
}

module.exports = {
  check: check
};
