'use strict';

function index(req, res) {
  var content = 'The IOM Flights API supports using the If-None-Match & If-Modified-Since caching request headers, by using these headers you can reduce traffic being sent unnecessarily when data has not changed.';

  res.set('Content-Type', 'text/plain');
  res.send(content);
}

module.exports = {
  index: index
};
