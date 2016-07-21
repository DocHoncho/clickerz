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
  const template = require('./Templates/TabManager.twig');

  var $root_html = $(template({
    this: this
  }));

  var $tab_content = $root_html.children('.tab-content');
  const page_template = require('./Templates/TabPage.twig');
  _.each(this.tabs, (tab) => {
    var $tab_html = $(page_template({this: tab}));
    tab.renderer($tab_html.find('.panel-body'));
    $tab_content.append($tab_html);
  });

  root.append($root_html);
};

module.exports = TabManager;
