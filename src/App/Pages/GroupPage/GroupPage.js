const _ = require('lodash');
const BasePage = require('../../Components/Page/BasePage/BasePage');

const GroupPage = function () {
  BasePage.call(this, {
    name: 'page-group',
    title: 'Group',
    attrs: {
      id: '#page-group'
    }
  });
};

_.assign(GroupPage.prototype, BasePage.prototype);

GroupPage.prototype.renderPage = function (root) {
  root.append(require('./GroupPage.twig')({this: this}));
};

module.exports = GroupPage;
