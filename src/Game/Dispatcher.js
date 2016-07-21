var Dispatcher = function () {
  this.listeners = [];
};

Dispatcher.prototype.addListener = function (name, callback) {
  this.listeners.push({name: name, callback: callback});
};

Dispatcher.prototype.dispatch = function (msg) {
  this.listeners.forEach(function (item) {
    item.callback(msg);
  });
};

module.exports = Dispatcher;