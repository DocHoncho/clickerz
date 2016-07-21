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

var render = (fn, obj, context) => {
  let template = require(fn);

  return template(_.merge({this: obj}, context));
};

SurvivorPage.prototype.render = function (root) {
  var html = render('./Templates/SurvivorPage.twig', this, {});;

  if (root) {
    var $html = $(html);;
    root.append($html);
  }

  return html;
};

module.exports = SurvivorPage;
