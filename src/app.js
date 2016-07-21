window.jQuery = window.$ = require('jquery');
require('bootstrap-loader');
require('font-awesome/css/font-awesome.css');
require('./app.scss');

const App = require('./App/App');

var app = new App();
app.render($('#root'));
app.run();