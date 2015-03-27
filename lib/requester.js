'use strict';

let request = require('request');

function debug(response) {
  logger.debug('received status', response.statusCode);
  logger.debug('received etag', response.etag);
  logger.debug('received body', response.body);
}

function performRequest(url, etagReq) {
  let opts = { url: url, headers: { 'If-None-Match': etagReq || '' } };
  logger.debug('sending request', opts);

  return new Promise((fulfill, reject) => {
    request(opts, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      } else {
        debug(response);

        fulfill({
          status: response.statusCode,
          etag: response.headers.etag,
          body: response.body
        });
      }
    });
  });
}

module.exports = performRequest;