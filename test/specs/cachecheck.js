'use strict';

//load globals
require('../../globals');

let expect = require('expect.js');

describe('when checking incoming request cache headers', () => {
  let cachecheck = libRequire('cachecheck');

  describe('given if-none-match header is missing', () => {
    let ctx = {
                protocol: 'http',
                host: 'localhost:3000',
                get: Function.prototype,
                body: {}
              };

    it('should set caching meta data property to body', () => {
      let gen = cachecheck.call(ctx, Function.prototype);
      gen.next();
      gen.next();

      expect(ctx.body).to.have.property('meta');
      expect(ctx.body.meta).to.have.property('caching');
    });

    it('should use correct uri for caching', () => {
      let gen = cachecheck.call(ctx, Function.prototype);
      gen.next();
      gen.next();

      expect(ctx.body.meta.caching).to.be('http://localhost:3000/v1/caching');
    });
  });

  describe('given if-none-match header is present', () => {
    let ctx = {
                protocol: 'http',
                body: {},
                get: header => {
                  if (header === 'if-none-match') {
                    return 'dkwikso32ksld';
                  }
                }
              };

    it('should not set any caching meta data', () => {
      let gen = cachecheck.call(ctx, Function.prototype);
      gen.next();
      gen.next();

      expect(ctx.body).to.not.have.property('meta');
    });
  });
});