const _ = require('lodash');
const $ = require('jquery');
const BasePage = require('../BasePage/BasePage');

const TabManager = require('../../../Components/Tabs/TabManager');

require('./TabbedPage.scss');

/**
 * TabbedPage - A Page with Tabs!
 *
 * @constructor
 */
const TabbedPage = function (args={}) {
  BasePage.call(this, args);

  this.tabs = new TabManager([], {});

  console.log('tabbedpage', this, args);
};

_.assign(TabbedPage.prototype, BasePage.prototype);

const bpr = BasePage.prototype.render;
TabbedPage.prototype.render = function (root) {
  var $base_html = $('<div></div>');
  bpr.call(this, $base_html);
  const $base_root = $base_html.find('.panel-body');

  let template = require('./TabbedPage.twig');
  var $html = $(template({this: this}));
  var $content_root = $html.filter('.page-tabs');
  this.tabs.render($content_root);

  $base_root.before($html);

  root.append($base_html.html());
};

module.exports = TabbedPage;
