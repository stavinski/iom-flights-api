'use strict';

// load globals
require('./globals');

// load new relic
require('newrelic');

let util = require('util'),
    winston = require('winston'),
    app = require('koa')(),
    koalogger = require('koa-logger'),
    router = require('koa-router')(),
    cors = require('koa-cors'),
    jsonp = require('koa-jsonp');

// set logging level
winston.level = conf('LOG_LEVEL');

// middlewares
let cachecheck = libRequire('cachecheck');

// controllers
let caching = libRequire('controllers/caching'),
    flights = libRequire('controllers/flights');

router.get('/v1/caching', caching.index);

router.get('/v1/flights', flights.index)
      .get('/v1/flights/arrivals', flights.arrivals, cachecheck)
      .get('/v1/flights/departures', flights.departures, cachecheck);

app.use(koalogger());
app.use(cors());
app.use(jsonp());
app.use(router.routes());

app.listen(conf('PORT'));

logger.info(util.format('IOM Flights API listening on %d', conf('PORT')));