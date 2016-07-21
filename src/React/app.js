var React = require('react');
var ReactDOM = require('react-dom');

window.jQuery = window.$ = require('jquery/dist/jquery.min');
require('bootstrap-loader');  
require('./scss/main.scss');

import App from 'containers/App/App'

import {browserHistory} from 'react-router'
import makeRoutes from './routes'

const routes = makeRoutes();

const mountNode = document.querySelector('#root');
ReactDOM.render(<App history={browserHistory} routes={routes} />, mountNode);