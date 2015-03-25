'use strict';

function* caching(next) {
  this.set('Content-Type', 'text/plain');
  this.body = 'The IOM Flights API supports using the If-None-Match caching request headers, by using these headers you can reduce traffic being sent unnecessarily when data has not changed.';

  yield next;
}

module.exports = caching;