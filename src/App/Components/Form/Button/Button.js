const _ = require('lodash');
const $ = require('jquery');

require('./Button.scss');

const Button = function (id, label, args) {
  const defaults = {
    class: '',
    btn_class: 'btn-primary',
    type: 'button'
  };

  _.assign(this, defaults, args);
};

Button.prototype.onClick = function (event) {};

Button.prototype.render = function (root) {
  const template = require('./Button.twig');
  this.html = template({this: this});
  this.$html = $(this.html);

  this.$html.on('click', this.onClick.bind(this));

  root.append(this.$html);
};