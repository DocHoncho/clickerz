var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('streamify');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

var environment = 'dev';
var ENV = {
	'prod': {
		PATH: 'build/dist',
	},
	'dev': {
		PATH: 'build/dev',
	},
};

var path = {
	HTML: 'src/index.html',
	JS: {
		OUT: 'build.js',
		MINIFIED_OUT: 'build.min.js',
	},
	BASE_PATH: ENV[environment].PATH,
	DEST: ENV[environment].PATH,
	DEST_JS: ENV[environment].PATH + '/javascripts',
	DEST_CSS: ENV[environment].PATH + '/stylesheets',
	SCSS_ENTRY_POINT: 'src/scss/main.scss',
	ENTRY_POINT: './src/js/app.js',
	SCSS: {
		includePaths: [
			'node_modules/bootstrap-sass/assets/stylesheets'
		]
	}
};
console.log(path);

gulp.task('copy', function () {
	gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST));
});

gulp.task('scss', function () {
	return gulp.src(path.SCSS_ENTRY_POINT)
		.pipe(sass({
			includePaths: 'node_modules/bootstrap-sass/assets/stylesheets'
		})
		.on('error', sass.logError))
		.pipe(gulp.dest(path.DEST_CSS));
});

gulp.task('watch', function () {
	gulp.watch(path.HTML, ['copy']);
	gulp.watch('scss/**/*.scss', ['scss']);

	var watcher = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));

	function rebundle (file) {
		if (file) {
			file.map(function (fileName) {
				gutil.log('File updated', gutil.colors.yellow(fileName));
			})
		}

		return watcher.bundle()
			.pipe(source(path.JS.OUT))
			.pipe(gulp.dest(path.DEST_JS))
			.on("error", function(err) {
                gutil.log("Browserify error:", err);
            });
	}

	watcher.on('update', rebundle);

	return rebundle();
});

gulp.task('bundle', function () {
	return devBundler();
});

gulp.task('build-prod', function () {
	browserify({
			entries: [path.ENTRY_POINT],
			transform: [reactify]
		})
		.bundle()
		.pipe(source(path.JS.MINIFIED_OUT))
		.pipe(streamify(uglify(path.JS.MINIFIED_OUT)))
		.pipe(gulp.dest(DEST_BUILD));
});

gulp.task('replaceHTML', function  () {
	gulp.src(path.HTML)
		.pipe(htmlreplace({
			'js': 'build/' + path.JS.MINIFIED_OUT
		}))
		.pipe(gulp.dest(path.DEST_JS));
});

gulp.task('default', ['copy', 'scss', 'watch']);
gulp.task('production', ['copy', 'scss', 'replaceHTML', 'build']);