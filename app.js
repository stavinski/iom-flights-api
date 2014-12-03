'use strict';

// load globals
require('./globals');

var express = require('express'),
    app = express(),
    cors = require('cors'),
    expressLogger = require('morgan'),
    errorhandler = require('errorhandler'),
    routerV1 = express.Router(),
    routes = libRequire('routes');

// we handle the caching based off the data feed
app.set('etag', false);
app.set('port', conf('PORT'));

// allow cross origin sharing
app.use(cors());

// log requests
app.use(expressLogger('dev'));

// setup routes based off version
routes.v1(routerV1);
app.use('/v1', routerV1);

// use error handler only in dev
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler());
}

app.listen(conf('PORT'), function () {
  logger.info('flights api listening on port: ' + app.get('port'));
});
