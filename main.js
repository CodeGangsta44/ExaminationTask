'use strict';

const getInfo = require('./get-list-of-groups.js');
const readName = require('./readline.js');

readName().then(name => getInfo(name));
