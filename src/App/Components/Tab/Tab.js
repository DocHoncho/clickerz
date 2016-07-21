const _ = require('lodash');
const $ = require('jquery');

var Tab = function (name, title, callback) {
  this.name = name;
  this.title = title;
  this.callback = callback;
};

Tab.prototype.render = function () {
  return '';
};

var Tabs = function () {
  this.tabs = [];
};

Tabs.prototype.add = function (name, title, callback) {
  this.tabs.push(new Tab(name, title, callback));
};

Tabs.prototype.remove = function (name) {
  var idx = this.tabs.findIndex((i) => (i.name == name));
  if (!idx) {
    return;
  }

  this.tabs.splice(idx, 1);
};

Tabs.prototype.render = function () {

};

module.exports = {
  Tabs: Tabs,
  Tab: Tab
};