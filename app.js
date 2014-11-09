'use strict';

var express = require('express'),
    app = express(),
    routerV1 = express.Router(),
    routes = require('./lib/routes');

// load globals
require('./lib/globals');

// setup routes based off version
routes.v1(routerV1);
app.use('/v1', routerV1);

app.listen(conf('PORT'));
