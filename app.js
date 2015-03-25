'use strict';

// load globals
require('./globals');

var util = require('util'),
    app = require('koa')(),
    koalogger = require('koa-logger'),
    router = require('koa-router')(),
    cors = require('koa-cors'),
    jsonp = require('koa-jsonp'),
    caching = require('./lib/controllers/caching');

router.get('/v1/caching', caching);

app.use(koalogger());
app.use(cors());
app.use(jsonp());
app.use(router.routes());

app.listen(conf('PORT'));

logger.info(util.format('IOM Flights API listening on %d', conf('PORT')));