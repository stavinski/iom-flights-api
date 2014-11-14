'use strict';

var _ = require('lodash');

function _require(root, path) {
  return require(root + '/' + path);
}

global.conf = require('./cfg');

global.rootRequire = _.partial(_require, __dirname);
global.libRequire = _.partial(_require, __dirname + '/lib');
