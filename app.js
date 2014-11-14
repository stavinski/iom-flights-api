'use strict';

// load globals
require('./globals');

var express = require('express'),
    app = express(),
    routerV1 = express.Router(),
    routes = libRequire('routes');

// setup routes based off version
routes.v1(routerV1);
app.use('/v1', routerV1);

app.listen(conf('PORT'));
