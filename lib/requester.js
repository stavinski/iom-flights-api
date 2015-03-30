'use strict';

let co = require('co'),
    request = require('co-request');

function debug(response) {
  logger.debug('received status', response.statusCode);
  logger.debug('received etag', response.etag);
  logger.debug('received last modified', response.headers['last-modified']);
  logger.debug('received body', response.body);
}

function performRequest(url, etag) {
  let opts = { url: url, headers: { 'If-None-Match': etag || '' } };
  logger.debug('sending request', opts);

  return co(function* () {
    let response = yield request(opts);

    return {
      status: response.statusCode,
      etag: response.headers.etag,
      updated: response.headers['last-modified'],
      body: response.body
    };
  });
}

module.exports = performRequest;