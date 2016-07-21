const Dispatcher = require('./Dispatcher');

//export class Timer {
var Timer = function (rate, cb) {
  this.rate = rate;
  this.callback = cb;
  this.timerHandle = null;
};

Timer.prototype.start = function () {
  this.installTimer();
};

Timer.prototype.stop = function () {
  this.uninstallTimer();
};

Timer.prototype.installTimer = function () {
  if (this.timerHandle !== null) {
    this.uninstallTimer();
  }

  this.timerHandle = window.setInterval(this.callback, this.rate);
};

Timer.prototype.uninstallTimer = function () {
  window.clearInterval(this.timerHandle);
  this.timerHandle = null;
};


module.exports = Timer;