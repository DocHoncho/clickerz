const Game = require('../Game/Game');
const Menu = require('./Components/Menu/Menu');

const TabManager = require('./Components/Tabs/TabManager');
const TabPage = require('./Components/Tabs/TabPage');
const SurvivorPage = require('./Pages/SurvivorPage.js');
const GroupPage = require('./Pages/GroupPage.js');
const TemplatePage = require('./Pages/TemplatePage');

const ENV = {
  APP_TITLE: 'ClickerZ Demo App',
  APP_AUTHOR: 'Joel Madigan',
  APP_AUTHOR_EMAIL: 'joel@colloquialtech.com',
  APP_VERSION: '0.0.1',
};

var App = function () {
  this.menuBar = new Menu.MenuBar(ENV.APP_TITLE, [
    ['link-1', {
      itemType: 'action',
      text: 'CLICKEY',
      callback: () => { console.log('You dun it');}
    }, 0],
    ['a-dropdown', {
      itemType: 'dropdown',
      text: 'Stuff',
      children: [
        {
          itemType: 'dropdown-action',
          text: 'Junk',
          callback: () => { console.log('huh.  it worked'); }
        },
        {
          itemType: 'dropdown-separator'
        },
        {
          itemType: 'dropdown-action',
          text: 'More Junk',
          callback: () => { console.log('huh.  it worked again'); }
        }
      ]
    }, 1]
  ]);

  this.tabManager = new TabManager([
    new TabPage('survivor-tab', 'Survivor', {
      page: new SurvivorPage()
    }),
    new TabPage('group-tab', 'Group', {
      page: new GroupPage()
    }),
    new TabPage('camp-tab', 'Camp', {
      page: new TemplatePage(require('./Pages/Templates/StubPage.twig'), this)
    }),
    new TabPage('stats-tab', 'Camp', {
      renderer: function (root) { root.append($('<h1>Stub</h1>')); }
    })
  ]);

  this.tabManager.activateTab('survivor-tab');
};

App.prototype.run = function () {
  Game.run();
};

App.prototype.render = function (root) {
  var template = require('./App.twig');
  var context = {
    ENV: ENV
  };

  var $html = $(template(context));
  this.menuBar.render($html.filter('#topNav'));
  this.tabManager.render($html.filter('#tabs'));

  root.html($html);
};

const Twig = require('twig');

Twig.extendFunction('render', function (value) {
  console.log(value);
  return value.render();
});

module.exports = App;