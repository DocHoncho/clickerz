const _ = require('lodash');
const $ = require('jquery');

var TabPage = require('./TabPage');

/**
 * TabManager - Manages tabs
 *
 * Wrapper class to make rendering and manipulating tabbed containers easier
 *
 * @param {array} tabs Optional, specify tabs on creation
 * @param {object} args Optional, change defaults
 * @constructor
 */
var TabManager = function (tabs, args={}) {
  let defaults = {
    activeTab: 0,
    attrs: {
      id: '',
      class: ''
    }
  };
  _.assign(this, defaults, _.pick(defaults, args));

  this.tabs = (_.isUndefined(tabs) || _.isNull(tabs)) ? [] : tabs;
};

/**
 * Add a new tab to Manager
 *
 * Creates a new TabPage from arguments
 * You'll need to pass ether page or renderer through args if you expect to do anything.
 *
 * @param {string} name Name of tab to add
 * @param {string} title TItle of tab to add
 * @param {Object} args Default settings of tab
 */
TabManager.prototype.addTab = function (name, title, args) {
  var newTab = new TabPage(name, title, args);

  this.tabs.push(newTab);

  // Logic to refresh/render added tab
};

/**
 * Remove tab from Manager
 *
 * @param {string} name Name of tab to remove
 */
TabManager.prototype.removeTab = function (name) {
  var idx = this.tabs.findIndex((i) => (i.name == name));
  if (!idx) {
    return;
  }

  this.tabs.splice(idx, 1);
};

/**
 * Activate a TabPage
 * @param {string} name Name of tab to activate
 */
TabManager.prototype.activateTab = function (name) {
  var tab = _.find(this.tabs, {name: name});
  tab.active = true;
};

/**
 * Render the TabManager
 *
 * @param {jQuery} root Root to insert rendered content into
 */
TabManager.prototype.render = function (root) {
  const template = require('./Templates/TabManager.twig');
  const html = template({this: this});
  const $html = $(html);
  const $content_root = $html.filter('.tab-content');

  _.each(this.tabs, (tab) => {
    tab.render($content_root);
  });

  root.append($html);
};

/**
 * Return number of tabs in manager
 * @returns {Number} Number of tabs in Manager
 */
TabManager.prototype.length = function () {
  return this.tabs.length;
};

module.exports = TabManager;
