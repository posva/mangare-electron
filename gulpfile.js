'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gulpcoffeeify = require('gulp-coffeeify');
var coffeeify = require('coffeeify');
var through = require('through');
var coffeelint = require('gulp-coffeelint');
var debug = require('gulp-debug');
var isDist = process.argv.indexOf('js') === -1;
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('lodash');

gulp.task('lint:coffee', function() {
  return gulp.src('app/coffee/**/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffeelint.reporter('fail'));
});

gulp.task('lint', ['lint:coffee']);

gulp.task('js', function() {
  return gulp.src('app/coffee/main.coffee')
    .pipe(isDist ? through() : plumber())
    .pipe(gulpcoffeeify({
      options: {
        debug: !isDist,
        fast: true,
      }
    }))
    .pipe(gulp.dest('app/js'));
});

gulp.task('coffee', function() {
  var customOpts = {
    //entries: ['./app/coffee/main.coffee'],
    debug: true,
    //fast: true
  };
  var opts = _.assign({}, watchify.args, customOpts);
  var b = watchify(browserify(opts));
  b.transform(coffeeify);

  var bundle = function() {
    return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('./app/coffee/main.coffee'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./app/js'));
  };

  b.on('update', bundle);
  b.on('log', gutil.log);
  return bundle();
});

gulp.task('build', ['js']);

gulp.task('watch', ['js'], function() {
  gulp.watch([
    'app/coffee/**/*.coffee'
  ], ['js']);
});

gulp.task('default', ['lint', 'test']);
