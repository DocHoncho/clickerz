const _ = require('lodash');

/**
 * Base TabPage container class
 *
 * Intended as base layer upon which more complicated pages will build
 *
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
  console.log(this);
};

/**
 * Render the Page
 * @returns {*}
 */
TabPage.prototype.render = function (root) {
  const template = require('./Templates/TabPage.twig');
  var $root_html = $(template({
    this: this
  }));

  var $inner_html = $root_html.find('.panel-body');
  this.renderer($inner_html);

  root.append($root_html);
};

module.exports = TabPage;