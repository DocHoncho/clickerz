const _ = require('lodash');

/**
 * Base TabPage container class
 *
 * Intended as base layer upon which more complicated pages will build
 *
 * @param name TabPage name
 * @param title Page title
 * @param args Modify default arguments
 * @constructor
 */
const TabPage = function (name, title, args) {
  let defaults = {
    name: name,
    title: title,
    active: false,
    index: 0,
    attrs: {
      class: '',
      id: ''
    },
    renderer: null,
    page: null
  };

  _.assignIn(this, defaults, _.pick(args, _.keys(defaults)));
};

/**
 * Render the Page
 *
 * @param {jQuery} root Jquery object for root at which to insert new nodes
 * @returns {*}
 */

TabPage.prototype.render = function (root) {
  var $pageHtml = $(require('./Templates/TabPage.twig')({this: this}));
  //var $panelBody = $pageHtml.find('.panel-body');

  if (this.page) {
    this.page.render($pageHtml);
  } else if (this.renderer) {
    this.renderer($pageHtml);
  } else {
    alert('I screamed because I didn\'t know what else to do!');
  }

  root.append($pageHtml);
};

module.exports = TabPage;