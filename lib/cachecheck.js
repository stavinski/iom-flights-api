'use strict';

let util = require('util'),
    _ = require('lodash');

function* check(next) {
  yield next;

  if (!this.get('if-none-match')) {
    logger.debug('missing caching header sending caching meta data');

    let url = util.format('%s://%s/v1/caching', this.protocol, this.host);
    let caching = {
      meta: {
        caching: url
      }
    };

    _.merge(this.body, caching);
  }
}

module.exports = check;