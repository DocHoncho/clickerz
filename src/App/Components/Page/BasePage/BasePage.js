const _ = require('lodash');
const $ = require('jquery');

const TabManager = require('../../../Components/Tabs/TabManager');

/**
 * BasePage - Survivor Detail page
 *
 * @constructor
 */
const BasePage = function (args={}) {
  const defaults = {
    name: '',
    title: '',
    attrs: {
      id: '',
      class: ''
    }
  };
  _.assign(this, defaults, _.pick(args, _.keys(defaults)));
};

BasePage.prototype.renderPage = function (root) {};

BasePage.prototype.render = function (root) {
  const template = require('./BasePage.twig');
  var $html = $(template({this: this}));
  var $content_root = $html.find('.page-content');
  if ($content_root.length == 0) {
    console.log('EMPTY CONTENT ROOT in ' + typeof this + ' ', this);
  }

  this.renderPage($content_root);

  root.append($html);
};

module.exports = BasePage;
