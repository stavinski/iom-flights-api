'use strict';

function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

function toLocalISOString (dateIn) {
  return dateIn.getFullYear() +
    '-' + pad(dateIn.getMonth() + 1) +
    '-' + pad(dateIn.getDate()) +
    'T' + pad(dateIn.getHours()) +
    ':' + pad(dateIn.getMinutes()) +
    ':' + pad(dateIn.getSeconds());
}

function parse(val) {
  return new Date(val);
}

module.exports = {
  toLocalISOString: toLocalISOString,
  parse: parse
};
