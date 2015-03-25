'use strict';

function _require(root, path) {
  return require(root + '/' + path);
}

global.rootRequire = _require.bind(null, __dirname);
global.libRequire = _require.bind(null, __dirname + '/lib');

global.conf = require('./cfg');
global.logger = libRequire('logger');
