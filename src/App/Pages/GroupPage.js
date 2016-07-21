const _ = require('lodash');
const TabPage = require('../Components/Tabs/TabPage');

const GroupPage = function () {
  TabPage.call(this, 'Group', {});

};

_.extend(GroupPage.prototype, TabPage.prototype);

GroupPage.prototype.render = function () {
  return require('./Templates/GroupPage.twig')({this: this});
};

module.exports = GroupPage;
