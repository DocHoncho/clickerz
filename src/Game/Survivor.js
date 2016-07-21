const _ = require('lodash');
const moment = require('moment');
const env = require('Game/Constants');

const Survivor = function (args) {
  const defaults = {
    name: '',
    age: 0, // Number of ticks been alive, birth_date determines
    birth_date: null,
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
    }
  };
  _.assignIn(this, defaults, args);
};

Survivor.prototype.update = function (tick) {
  this.age += 1;
};

module.exports = {
  Survivor: Survivor
};