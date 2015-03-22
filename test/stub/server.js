'use strict';

var koa = require('koa'),
    serve = require('koa-static'),
    app = koa();

app.use(serve('./test/stub'));

app.listen(3001);

console.log('data feed stub listening on 3001');