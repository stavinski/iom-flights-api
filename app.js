'use strict';

var express = require('express'),
    app = express(),
    routes = require('./lib/routes');

// load globals
require('./lib/globals');

// setup routes
routes(app);

app.listen(conf('PORT'));
