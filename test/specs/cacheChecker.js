'use strict';

//load globals
require('../../globals');

var expect = require('expect.js');

describe('when checking incoming request cache headers', function () {
  var sut = libRequire('cacheChecker');

  describe('given both headers are missing', function () {
    var req = { protocol: 'http',
                get: function (header) {
                  if (header === 'host') {
                    return 'localhost:3000';
                  }

                  return undefined;
                }
              };

    it('should set caching meta data property to passed object', function () {
      var result = sut.check(req, {});

      expect(result).to.have.property('meta');
      expect(result.meta).to.have.property('caching');
    });

    it('should use correct uri for caching', function () {
      var result = sut.check(req, {});

      expect(result.meta.caching).to.be('http://localhost:3000/v1/caching');
    });

  });

  describe('given if-none-match header is present', function () {
    var req = { protocol: 'http',
          get: function (header) {
            if (header === 'if-none-match') {
              return 'dkwikso32ksld';
            }

            return undefined;
          }
        };

    it('should not set any caching meta data', function () {
      var result = sut.check(req, {});

      expect(result).to.not.have.property('meta');
    });
  });

  describe('given if-modified-since header is present', function () {
    var req = { protocol: 'http',
              get: function (header) {
                if (header === 'if-modified-since') {
                  return 'Fri, 14 Nov 2014 21:02:57 GMT';
                }

                return undefined;
              }
            };

    it('should not set any caching meta data', function () {
      var result = sut.check(req, {});

      expect(result).to.not.have.property('meta');
    });
  });

});
