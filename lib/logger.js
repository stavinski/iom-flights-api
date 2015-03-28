'use strict';

let logger = require('winston'),
    api = module.exports = {},
    levels = ['debug', 'info', 'warn', 'error'];

levels.forEach(function (level) {
    api[level] = logger[level].bind(logger);
});
