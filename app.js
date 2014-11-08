'use strict';

var http = require('http'),
    cfg = require('./cfg');

function handler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Here\'s Johnny!');
}

var app = http.createServer(handler);

app.listen(cfg('PORT'));
