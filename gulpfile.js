var gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence'),
  inject = require("gulp-inject");

gulp.task('default', function(callback) {
  runSequence('build', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean',
    'copy-build',
    'index',
    callback);
});

gulp.task('clean', function (callback) {
  del(['./build'], {force: true}, callback)
});

gulp.task('copy-build', ['copy-assets', 'copy-app-js', 'copy-vendor-js']);

gulp.task('copy-assets', function () {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('copy-app-js', function () {
  return gulp.src('./src/**/*.js')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-vendor-js', function() {
  return gulp.src('./vendor/**/*.js')
    .pipe(gulp.dest('./build/vendor'));
});

gulp.task('index', function () {
  return gulp.src('./src/index.html')
    .pipe(inject(
      gulp.src(['./build/vendor/**/*.js', './build/app/**/*.js', './build/assets/css/**/*.css']), {
        ignorePath: 'build'
      }))
    .pipe(gulp.dest("./build"));
});