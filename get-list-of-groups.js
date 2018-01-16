'use strict';

const getShedule = require('./read-and-parse');
const shedule = getShedule('./data.json');

class Group {
  constructor(name) {
    this.name = name,
    this.quantity = 1;
    this.teachers = [];
    this.disciplines = [];
  }
}

function getLessons(data) {
  const lessons = [];
  for (const week in data) {
    for (const day in data[week]) {
      for (const lesson in data[week][day]) {
        lessons.push(data[week][day][lesson]);
      }
    }
  }
  return lessons;
}

function getGroups(data) {
  const massiveOfGroups = [];
  const grps = [];
  for (const lesson of data) {
    for (const group of lesson.groups) {
      const teachr = lesson['teachers'][0]['name'];
      const discipline = lesson['discipline']['name'];
      const name = group.name;
      if (grps[name]) {
        grps[name].quantity += 1;
        if (!((grps[name].teachers).includes(teachr))) {
          grps[name].teachers.push(teachr);
        }
        if (!((grps[name].disciplines).includes(discipline))) {
          grps[name].disciplines.push(discipline);
        }
      } else {
        grps[name] = new Group(name);
      }
    }
  }
  for (const index in grps) massiveOfGroups.push(grps[index]);
  massiveOfGroups.sort(compareByLessons).sort(compareByName);
  console.log(massiveOfGroups);
  return massiveOfGroups;
}
function compareByLessons(groupA, groupB) {
  if (groupA.quantity > groupB.quantity) return -1;
  if (groupA.quantity < groupB.quantity) return 1;
}
function compareByName(groupA, groupB) {
  if(groupA.quantity == groupB.quantity){
    if ((groupA.name).toLowerCase() < (groupB.name).toLowerCase()) {
      return 1;
    }
    if ((groupA.name).toLowerCase() > (groupB.name).toLowerCase()) {
      return -1;
    }
  } else return -1
}

function out(obj) {
  //console.clear();
  console.log('Name of this group is ' + obj.name);
  console.log('This group has ' + obj.quantity +  ' lessons per weeks');
  console.log('Teachers of this group: ' + obj.teachers.join(', '));
  console.log('This group learns those disciplines: ' +
  obj.disciplines.join(', '));
}

function getInfo(groups, nm) {
  let counter = 0;
  for (let i of groups) {
    counter++;
    if (i.name === nm) {
      counter = groups.length + 1;
      out(i);
    }
    if (counter === groups.length){
      //console.clear();
      console.log('No such group!');
    }
  }
}

module.exports = getInfo.bind(null, getGroups(getLessons(shedule)));
