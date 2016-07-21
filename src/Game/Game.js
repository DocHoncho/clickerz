const _ = require('lodash');

const Kernel = require('Core/Kernel');
const World = require('Core/World');
const Random = require('Core/Random');
const Survivor = require('Core/Survivor');
const OPTIONS = {
  ticksPerSecond: 30
};

var Game = function () {
  var world = this.world = new World({beat: 100});
  Kernel
    .addTimer('world-beat', 1000 / OPTIONS.ticksPerSecond, false)
    .on('world-beat-tick', world.update.bind(world));
  this.worldTimer = Kernel.getTimer('world-beat');
}

Game.prototype.run = function () {
  this.worldTimer.start();
}

let _game = new Game();

module.exports = _game;