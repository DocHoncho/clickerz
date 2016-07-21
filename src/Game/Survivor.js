const _ = require('lodash');
const moment = require('moment');
const env = require('Core/environment');

const Survivor = function (args) {
  const defaults = {
    name: '',
    age: 0,
    birthdate: null,
    sex: '',
    gender: '', // Maybe maybe not... lulz
    health: 0,
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      charisma: 0,
      intelligence: 0,
      wisdom: 0
    },
  };
  _.assignIn(this, defaults, args);
}

Survivor.prototype.roll_name = function () {

}

var s = new Survivor();
console.log(s);

module.exports = {
  Survivor: Survivor,
}