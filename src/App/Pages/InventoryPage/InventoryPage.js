const _ = require('lodash');
const TabPage = require('../../Components/Tabs/TabPage');

/**
 *
 * @constructor
 */
const InventoryPage = function () {
  TabPage.call(this, 'Inventory', {});

};

_.extend(InventoryPage.prototype, TabPage.prototype);

InventoryPage.prototype.render = function () {

};