'use strict';

// load globals
require('./globals');

var express = require('express'),
    app = express(),
    cors = require('cors'),
    routerV1 = express.Router(),
    routes = libRequire('routes');

// allow cross origin sharing
app.use(cors());

// setup routes based off version
routes.v1(routerV1);
app.use('/v1', routerV1);

// we handle the caching based off the data feed
app.set('etag', false);

app.listen(conf('PORT'));
