#REST IOM Flights Web Service Interface

[![Build Status](https://travis-ci.org/stavinski/iom-flights-api.svg?branch=master)](https://travis-ci.org/stavinski/iom-flights-api)

This is a REST based web API to query flight details for the Isle of Man airport (Ronaldsway) it runs on [nodejs](http://www.nodejs.org) and there is currently an up to date publicly available hosted version running on [heroku](http://wwww.heroku.com) and can be found here [http://iom-flights.herokuapp.com/v1/flights].

The aim was to wrap the existing data feed and to transform it into a standard REST web service interface this should make it easier for clients to consume the exposed flight data, you can either use the existing publicly hosted version or just clone the code and host it wherever you like.

## Base URI

All the documentation will use the public heroku version as the host:

`http://iom-flights.herokuapp.com/v1/`

As a best practice the IOM Flights REST API includes a version to allow backward compatibility for a limited time in case breaking changes need to be made.

The IOM Flights REST API at present runs only on HTTP this is mainly because all the data is publicly available and does not require the security HTTPS provides it also has the added benefit of allowing caching support.

## Caching Support

In order to reduce the traffic being sent between the client and the IOM Flights REST API you can use the [If-None-Match](http://en.wikipedia.org/wiki/HTTP_ETag) and [If-Modified-Since](http://en.wikipedia.org/wiki/List_of_HTTP_header_fields) HTTP headers, behind the scenes it using the values from the source data feed which also supports these headers.

The IOM Flights REST API keeps a cached copy of the flights in memory but will always make a request to the source to see if it is using the newest version.

_If you don't provide any of these headers the response will include meta data to link to caching information_

## Request Format

At present only the GET HTTP method is supported as the resources provided can only be retrieved, the possible response codes that can be returned are:

* __200 OK__: The request was successful and contains the response body of the resource
* __304 NOT MODIFIED__: Your clients cached copy is still up to date, no response body is sent
* __404 NOT FOUND__: The resource could not be located
* __500 SERVER ERROR__: The request could not be carried out due to an internal server error

## Response Format

The IOM Flights REST API uses [JSON](http://www.json.org/) as it's response format, more specifically it uses the standardised version found at [http://www.jsonapi.org/].

## Resources

### Flights Resource

Returns the 2 flight type resources available _arrivals_ and _departures_ and the URIs for both, used for reference.

#### Resource URI

`http://iom-flights.herokuapp.com/v1/flights`

#### JSON Response

```json
{
  "links": {
    "flights": {
      "arrivals": {
        "type":"flights",
        "href":"http://localhost:3000/v1/flights/arrivals"
      },
      "departures": {
        "type":"flights",
        "href":"http://localhost:3000/v1/flights/departures"
      }
    }
  }
}
```

### Flight Arrivals Resource

Returns the flight arrivals to the Isle of Man airport.

#### Resource URI

`http://iom-flights.herokuapp.com/v1/flights/arrivals`

#### Resource Properties

Object | Property | Description
--- | --- | ---
root | updated | The utc date & time of when the arrivals flight data was updated from the data feed
root | flights | An array of flights that match the supplied request
flight | id | The id of the flight this is the flight code
flight | type | Reference type of this resource (always flight)
flight.airport | name | Name of the airport the flight originated from
flight.airport | fullname | Full name of the airport the flight originated from
flight.airline | code | Code of the airline
flight.airline | name | Name of the airline
flight.scheduled | local | The local date & time the flight is scheduled to arrive
flight.scheduled | utc | The utc date & time the flight is scheduled to arrive
flight.expected | local | The local date & time the flight is expected to arrive
flight.expected | utc | The utc date & time the flight is expected to arrive
flight.actual | local | The local date & time the flight actually arrived
flight.actual | utc | The utc date & time the flight actually arrived
flight | status | The current status of the flight

#### JSON Response

```json
{
  "updated": "2014-11-26T19:30:00.000Z",
  "flights":[{
    "id":"EZY855",
    "type":"flight",
    "airport": {
      "name":"Gatwick",
      "fullname":"Gatwick"
    },
    "airline":{
      "code":"EZY",
      "name":"easyjet"
    },
    "scheduled":{
      "local":"2014-11-26T19:25:00",
      "utc":"2014-11-26T19:25:00.000Z"
    },
    "expected":{
      "local":"2014-11-26T19:15:00",
      "utc":"2014-11-26T19:15:00.000Z"
      },
    "actual":{
      "local":"2014-11-26T19:17:00",
      "utc":"2014-11-26T19:17:00.000Z"
    },
    "status":"Landed 19:17"
  }]
}
```

### Flight Departues Resource

Returns the flight departures from the Isle of Man airport.

#### Resource URI

`http://iom-flights.herokuapp.com/v1/flights/departures`

#### Resource Properties

Object | Property | Description
--- | --- | ---
root | updated | The utc date & time of when the departures flight data was updated from the data feed
root | flights | An array of flights that match the supplied request
flight | id | The id of the flight this is the flight code
flight | type | Reference type of this resource (always flight)
flight.airport | name | Name of the airport the flight is destined to
flight.airport | fullname | Full name of the airport the flight is destined to
flight.airline | code | Code of the airline
flight.airline | name | Name of the airline
flight.scheduled | local | The local date & time the flight is scheduled to depart
flight.scheduled | utc | The utc date & time the flight is scheduled to depart
flight.expected | local | The local date & time the flight is expected to depart
flight.expected | utc | The utc date & time the flight is expected to depart
flight.actual | local | The local date & time the flight actually departed
flight.actual | utc | The utc date & time the flight actually departed
flight | status | The current status of the flight

#### JSON Response

```json
{
  "updated": "2014-11-26T19:30:00.000Z",
  "flights":[{
    "id":"EZY855",
    "type":"flight",
    "airport": {
      "name":"Gatwick",
      "fullname":"Gatwick"
    },
    "airline":{
      "code":"EZY",
      "name":"easyjet"
    },
    "scheduled":{
      "local":"2014-11-26T19:25:00",
      "utc":"2014-11-26T19:25:00.000Z"
    },
    "expected":{
      "local":"2014-11-26T19:15:00",
      "utc":"2014-11-26T19:15:00.000Z"
    },
    "actual":{
      "local":"2014-11-26T19:17:00",
      "utc":"2014-11-26T19:17:00.000Z"
    },
    "status":"Landed 19:17"
  }]
}
```
