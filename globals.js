'use strict';

var R = require('ramda');

function _require(root, path) {
  return require(root + '/' + path);
}

global.rootRequire = R.lPartial(_require, __dirname);
global.libRequire = R.lPartial(_require, __dirname + '/lib');

global.conf = require('./cfg');
global.logger = libRequire('logger');
