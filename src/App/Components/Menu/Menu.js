const $ = require('jquery');
const _ = require('lodash');
const Twig = require('twig');

var MenuBar = function (title, items) {
  this.title = title;
  this.items = [];

  if (items) {
    this.addItems(items);
  }
};

MenuBar.prototype.render = function (root) {
  const template = require('./Menu.twig');
  var $html = template({
    title: this.title,
    items: this.items
  });

  root.append($html);
};

MenuBar.prototype.addItem = function (name, item, index) {
  this.items.push({
    name: name, 
    item: item, 
    index: (typeof index !== 'undefined') ? index : this.items.length
  });
};

MenuBar.prototype.addItems = function (items) {
  _.forEach(items, (i) => {
    this.addItem(i[0], i[1], i[2]);
  });
};

module.exports = {
  MenuBar: MenuBar

};