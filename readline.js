'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readName() {
  //console.clear();
  return new Promise((resolve) => {
    rl.question('Please, enter name of the group: ', data => {
      resolve(data.toString());
      rl.close();
    });
  });
}

module.exports = readName;
