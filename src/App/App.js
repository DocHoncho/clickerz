const Game = require('Game/Game');
const Menu = require('./Components/Menu/Menu');

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
};

App.prototype.run = function () {
  Game.run();
};

App.prototype.render = function () {
  var template = require('./Templates/index.twig');
  var context = {
    ENV: ENV,
    MenuBar: this.menuBar,
  };
  return template(context);
};

module.exports = App;