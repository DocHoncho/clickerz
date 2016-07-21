window.jQuery = window.$ = require('jquery');
require('bootstrap-loader');
require('font-awesome/css/font-awesome.css');
require('./scss/main.scss');
import App from './App/App';

var app = new App();
$('#root').html(app.render());
app.run();