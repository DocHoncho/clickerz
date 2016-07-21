const _ = require('lodash');
const $ = require('jquery');

const TabbedPage = require('../../Components/Page/TabbedPage/TabbedPage');

const TabPage = require('../../Components/Tabs/TabPage');
const TemplatePage = require('../TemplatePage/TemplatePage');

/**
 * SurvivorPage - Survivor Detail page
 *
 * @constructor
 */
const SurvivorPage = function (args={}) {
  TabbedPage.call(this, {
    name: 'survivor-tab',
    title: 'Survivor'
  });

  this.survivor = null;

  this.tabs.addTab('survivor-tab-bio', 'Bio', { page: new TemplatePage(require('./BioPage/BioPage.twig'))});
  this.tabs.addTab('survivor-tab-inventory', 'Inventory', { page: new TemplatePage(require('../InventoryPage/InventoryPage.twig'))});

  console.log('survivorpage', this, args);
};

_.assign(SurvivorPage.prototype, TabbedPage.prototype);

SurvivorPage.prototype.renderPage = function (root) {
  let template = require('./SurvivorPage.twig');
  var $html = $(template({this: this}));

  root.append($html);
};

module.exports = SurvivorPage;
