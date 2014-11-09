'use strict';

function routes(app) {

  app.get('/flights', function (req, res) {
    res.send({
      links: {
        flights: {
          arrivals: {
            type: 'flights',
            href: 'http://localhost:3000/flights/arrivals'
          },
          departures: {
            type: 'flights',
            href: 'http://localhost:3000/flights/departures'
          }
        }
      }
    });
  });

}

module.exports = routes;
