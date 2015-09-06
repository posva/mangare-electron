'use strict';
var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var csso = require('gulp-csso');
var plumber = require('gulp-plumber');
var coffeeify = require('gulp-coffeeify');
var vueify = require('vueify');
var through = require('through');
var coffeelint = require('gulp-coffeelint');
var debug = require('gulp-debug');
var del = require('del');
var uglify = require('gulp-uglify');
var isDist = process.argv.indexOf('watch') === -1;

gulp.task('lint:coffee', function() {
  return gulp.src('app/coffee/**/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffeelint.reporter('fail'));
});

gulp.task('lint', ['lint:coffee']);

gulp.task('clean:html', function(done) {
  del('app/*.html', done);
});

gulp.task('clean:js', function(done) {
  del('app/js/main.js', done);
});

gulp.task('clean:css', function(done) {
  del('app/style/**/*.css', done);
});

gulp.task('js', function() {
  return gulp.src('app/coffee/main.coffee')
    .pipe(isDist ? through() : plumber())
    .pipe(coffeeify({
      options: {
        debug: !isDist,
        fast: true,
        transforms: [vueify]
      }
    }))
    .pipe(isDist ? uglify() : through())
    .pipe(gulp.dest('app/js'));
});

gulp.task('html', ['clean:html'], function() {
  return gulp.src('app/*.jade')
    .pipe(isDist ? through() : plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src('app/style/**/*.styl')
    .pipe(isDist ? through() : plumber())
    .pipe(stylus({
      // Allow CSS to be imported from node_modules
      'include css': true,
      'paths': ['../node_modules']
    }))
    .pipe(isDist ? csso() : through())
    .pipe(gulp.dest('app/style'));
});

gulp.task('build', ['js', 'css', 'html']);

gulp.task('watch', ['css', 'html'], function() {
  gulp.watch(['app/style/**/*.styl'], ['css']);
  gulp.watch(['app/*.jade'], ['html']);
});

gulp.task('default', ['lint', 'test']);
