"use strict";

var gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	del          = require('del'),
	uglify       = require('gulp-uglify'),
	cleanCSS     = require('gulp-clean-css'),
	rename       = require("gulp-rename"),
	merge        = require('merge-stream'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync').create();

// Clean task
gulp.task('clean', function() {
  return del(['dist', 'assets/css/*.css']);
});

// Copy third party libraries from node_modules into /vendor
gulp.task('vendor:js', function() {
  return gulp.src([
    './node_modules/bootstrap/dist/js/*',
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
    .pipe(gulp.dest('./assets/js/vendor'));
});

// Copy font-awesome from node_modules into /fonts
gulp.task('vendor:fonts', function() {
  return  gulp.src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
  ])
    .pipe(gulp.dest('./assets/fonts/font-awesome'))
});

// Vendor task
gulp.task('vendor', gulp.parallel('vendor:fonts', 'vendor:js'));

// Copy vendor's js to /dist
gulp.task('vendor:build', function() {
  var jsStream = gulp.src([
    './assets/js/vendor/bootstrap.bundle.min.js',
    './assets/js/vendor/jquery.min.js'
  ])
    .pipe(gulp.dest('./dist/assets/js/vendor'));
  var fontStream = gulp.src(['./assets/fonts/font-awesome/**/*.*']).pipe(gulp.dest('./dist/assets/fonts/font-awesome'));
  return merge (jsStream, fontStream);
})

// Copy Bootstrap SCSS(SASS) from node_modules to /assets/scss/bootstrap
gulp.task('bootstrap:scss', function() {
  return gulp.src(['./node_modules/bootstrap/scss/**/*'])
    .pipe(gulp.dest('./assets/scss/bootstrap'));
});

// Compile SCSS(SASS) files
gulp.task('scss', gulp.series('bootstrap:scss', function compileScss() {
  return gulp.src([
		'./assets/scss/style.scss',
		'./assets/scss/fixed.scss'
	])
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./assets/css'))
}));

// Minify CSS
gulp.task('css:minify', gulp.series('scss', function cssMinify() {
  return gulp.src("./assets/css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
}));

// Minify Js
gulp.task('js:minify', function () {
  return gulp.src([
    './assets/js/contact.js',
  	'./assets/js/custom.js',
	  './assets/js/validator.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});

// Configure the browserSync task and watch file path for change
gulp.task('dev', function browserDev(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(['assets/scss/*.scss','assets/scss/**/*.scss','!assets/scss/bootstrap/**'], gulp.series('css:minify', function cssBrowserReload (done) {
    browserSync.reload();
    done(); //Async callback for completion.
  }));
  gulp.watch('assets/js/*.js', gulp.series('js:minify', function jsBrowserReload (done) {
    browserSync.reload();
    done();
  }));
  gulp.watch(['*.html']).on('change', browserSync.reload);
  done();
});

// Build task
gulp.task("build", gulp.series(gulp.parallel('css:minify', 'js:minify', 'vendor'), 'vendor:build', function copyAssets() {
  return gulp.src([
    '*.html',
    'favicon.ico',
    "assets/img/**"
  ], { base: './'})
    .pipe(gulp.dest('dist'));
}));

// Default task
gulp.task("default", gulp.series("clean", 'build'));
