'use strict';

const fs = require('fs');

function getShedule(filename) {
  const data = fs.readFileSync(filename).toString();
  const obj = JSON.parse(data);
  return obj.data;
}

module.exports = getShedule;
