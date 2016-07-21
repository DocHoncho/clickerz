const _ = require('lodash');
const $ = require('jquery');

const BasePage = require('../../../Components/Page/BasePage/BasePage');

/**
 * SurvivorPage - Survivor Detail page
 *
 * @constructor
 */
const BioPage = function (args={}) {
  BasePage.call(this, {
    name: 'survivor-bio-page',
    attrs: {
      class: 'subpage'
    }
  });
};

_.assign(BioPage.prototype, BasePage.prototype);

BioPage.prototype.renderPage = function (root) {
  let template = require('./BioPage.twig');
  this.$html = $(template({this: this}));

  root.append(this.$html);
};

module.exports = BioPage;
