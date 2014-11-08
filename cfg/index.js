'use strict';

var nconf = require('nconf');

nconf.use('memory');
nconf.argv();
nconf.env();
nconf.file('all', './cfg/all.json');

module.exports = nconf.get.bind(nconf);
