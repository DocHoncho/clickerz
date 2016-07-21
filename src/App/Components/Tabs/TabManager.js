const _ = require('lodash');
const $ = require('jquery');

var TabPage = require('./TabPage');

var TabManager = function (tabs, args) {
  let defaults = {
    activeTab: 0
  };
  _.assign(this, defaults, args);

  this.tabs = (_.isUndefined(tabs) || _.isNull(tabs)) ? [] : tabs;
};

TabManager.prototype.addTab = function (name, title, args) {
  var newTab = new TabPage(name, title, args);

  this.tabs.push(newTab);

  // Logic to refresh/render added tab
};

TabManager.prototype.removeTab = function (name) {
  var idx = this.tabs.findIndex((i) => (i.name == name));
  if (!idx) {
    return;
  }

  this.tabs.splice(idx, 1);
};

TabManager.prototype.activateTab = function (name) {
  var tab = _.find(this.tabs, {name: name});
  tab.active = true;
};

TabManager.prototype.render = function (root) {
  var $baseHtml = $(require('./Templates/TabManager.twig')({this: this}));
  var $tab_content = $baseHtml.children('.tab-content');
  _.each(this.tabs, (tab) => {
    tab.render($tab_content);
  });

  root.append($baseHtml);
};

module.exports = TabManager;
