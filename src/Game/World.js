const moment = require('moment');
const _ = require('lodash');

const Kernel = require('./Kernel');
const env = require('./Constants');

var World = function (args) {
  const defaults = {
    beat: 0
  };
  _.assign(this, defaults, args);

  this.gameStartDate = env.worldEndDate.clone().add(env.timeSinceWorldEnd);
};

World.prototype.update = function (beat) {
  this.beat += 1;
};

World.prototype.gameDate = function () {
  return this.gameStartDate.clone().seconds(this.beat);
};

module.exports = World;