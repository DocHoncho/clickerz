const webpack = require('webpack');
const fs = require('fs');
const path = require('path'),
	join = path.join,
	resolve = path.resolve;

const getConfig = require('hjs-webpack');

const root 		= resolve(__dirname);
const src 		= join(root, 'src');
const modules 	= join(root, 'node_modules');
const dest		= join(root, 'dist');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:3000');
    }

    return sources;
}

var config = getConfig({
	in: join(src, 'app.js'),
	out: dest,
	isDev: isDev,
	clearBeforeBuild: '!(images|static)',
	module: {
		loaders: [
			// {
			// 	test: /\.js$/,
			// 	loaders: ['babel'],
			// 	exclude: /node_modules/
			// },
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' }
		]
	}
});
config.sassLoader = {
   	includePaths: [
   		'node_modules/bootstrap-sass/assets',
   		//'node_modules/bootstrap-sass/assets/stylesheets',
   		'node_modules/bootstrap-sass/assets/fonts'
   		]
};

config.module.loaders.push({ test: /\.twig$/, loader: "twig-loader" });
config.devtool = '#inline-source-map';
// Roots
config.resolve.root = [src, modules];
config.resolve.alias = {
  'Core': join(src, 'Core'),
  'css': join(src, 'styles'),
  'containers': join(src, 'containers'),
  'components': join(src, 'components'),
  'utils': join(src, 'utils'),

  'styles': join(src, 'styles')
};
// end Roots
module.exports = config;
