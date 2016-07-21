const _ = require('lodash');
const $ = require('jquery');

/**
 *
 * @constructor
 */
const TemplatePage = function (template_fn, context) {
  this.template_fn = template_fn;
  this.context = context;
};

var render = (fn, obj, context) => {
  let template = require(fn);

  return template(_.merge({this: obj}, context));
};

TemplatePage.prototype.render = function (root) {
  var html = render(this, this, {});;

  if (root) {
    var $html = $(html);;
    root.append($html);
  }

  return html;
};

module.exports = SurvivorPage;
