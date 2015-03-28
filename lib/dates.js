'use strict';

function pad(number) {
  return (number < 10) ? '0' + number : number;
}

function toLocalISOString () {
  return this.getFullYear() +
    '-' + pad(this.getMonth() + 1) +
    '-' + pad(this.getDate()) +
    'T' + pad(this.getHours()) +
    ':' + pad(this.getMinutes()) +
    ':' + pad(this.getSeconds());
}

function init() {
  Date.prototype.toLocalISOString = toLocalISOString;
}

module.exports = init;