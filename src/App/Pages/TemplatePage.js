const _ = require('lodash');
const $ = require('jquery');

/**
 *
 * @constructor
 */
const TemplatePage = function (template_fn, context={}) {
  this.template_fn = template_fn;
  this.context = context;
};

TemplatePage.prototype.render = function (root) {
  var html = this.template_fn(_.merge({this: this}, this.context));

  if (root) {
    var $html = $(html);
    root.append($html);
  }

  return html;
};

module.exports = TemplatePage;
