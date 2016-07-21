const Timer = require('./Timer');
const _ = require('lodash');

function DuplicateTimerException (message) {
  this.message = message;
  this.name = 'DuplicateTimerException';
}

var Kernel = function (opts) {
  this.timers = {};
  this.dispatchers = {};
}

Kernel.prototype.addTimer = function (name, rate, start=false) {
  var handler = () => this.tickHandler(name);
  var newTimer = new Timer(rate, handler);

  if (!this.timers.hasOwnProperty(name)) {
    this.timers[name] = newTimer;
  }
  else {
    return;
  }

  this.addDispatcher(name + '-tick');
  
  if (start) {
    newTimer.start();
  }

  return this;
}

Kernel.prototype.removeTimer = function (name) {
  this.timers[name].stop();
  delete this.timers[name];

  this.removeDispatcher(name + '-tick');

  return this;
}

Kernel.prototype.getTimer = function (name) {
  return this.timers[name];
}

Kernel.prototype.tickHandler = function (timerName, tick) {
  this.dispatch(timerName + '-tick', 'tick');
}

Kernel.prototype.addDispatcher = function (name) {
  this.dispatchers[name] = [];

  return this;
}

Kernel.prototype.removeDispatcher = function (name) {
  delete this.dispatchers[name];

  return this;
}

Kernel.prototype.addListener = function (dispatcher, name, callback) {
  if (!this.dispatchers.hasOwnProperty(dispatcher)) {
    return;
  }

  this.dispatchers[dispatcher].push({name: name, callback: callback});
}

Kernel.prototype.removeListener = function (dispatcher, name) {
  if (!this.dispatchers.hasOwnProperty(dispatcher)) {
    return;
  }

  var disp = this.dispatchers[dispatcher];
  var idx = disp.findIndex( (o) => (o.name == name) );

  if (!idx) {
    return;
  }

  disp.listeners.splice(idx, 1);
}

Kernel.prototype.on = function (event, callback) {
  if (this.dispatchers.hasOwnProperty(event)) {
    this.addListener(event, 'on-' + event, callback);
  }
  else {
    return;
  }

  return this;
}

Kernel.prototype.dispatch = function (dispatcher, ...args) {
  var d = this.dispatchers[dispatcher];
  _.forOwn(d, function (obj, name) {
    obj.callback(args);
  });
}

let _kernel = new Kernel();

module.exports = _kernel;