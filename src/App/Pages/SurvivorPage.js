const _ = require('lodash');
const $ = require('jquery');

const TabManager = require('../Components/Tabs/TabManager');

/**
 *
 * @constructor
 */
const SurvivorPage = function () {
  this.survivor = null;

  this.tabs = new TabManager([]);

};

SurvivorPage.prototype.render = function (root) {
  let template = require('./Templates/SurvivorPage.twig');
  var html = template({this: this});

  if (root) {
    var $html = $(html);
    root.append($html);
  }

  return html;
};

module.exports = SurvivorPage;
