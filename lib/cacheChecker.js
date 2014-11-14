'use strict';

var util = require('util'),
    _ = require('lodash');

function check(req, obj) {
  var noneMatch = 'if-none-match',
      modifiedSince = 'if-modified-since';

  if (req.get(noneMatch) || req.get(modifiedSince)) {
    return obj;
  }

  var url = util.format('%s://%s', req.protocol, req.get('host')),
      json = {
        meta: { caching: util.format('%s/v1/caching', url) }
      };

  return _.merge(_.clone(obj), json);
}

module.exports = {
  check: check
};
