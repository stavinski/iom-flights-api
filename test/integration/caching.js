'use strict';

let util = require('util'),
    request = require('supertest'),
    expect = require('expect.js');

describe('when requesting caching information', () => {
  let url;

  beforeEach(() => {
    require('../../globals');
    url = conf('INTEGRATION_HOST');
  });

  it('should return response', done => {
    const response = 'The IOM Flights API supports using the If-None-Match caching request headers, by using these headers you can reduce traffic being sent unnecessarily when data has not changed.';

    request(url)
      .get('/v1/caching')
      .expect(200)
      .expect('Content-Type', /text\/plain/)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.text).to.be(response);
        done();
      });
  });

});