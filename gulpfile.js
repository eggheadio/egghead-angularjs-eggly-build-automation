var gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence');

gulp.task('default', function(callback) {
  runSequence('build', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean',
    'copy-build',
    callback);
});

gulp.task('clean', function () {
  return del(['./build'], {force: true});
});

gulp.task('copy-build', ['copy-html', 'copy-json', 'copy-assets', 'copy-app-js', 'copy-vendor-js']);

// Intermediate Step
gulp.task('copy-html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build'));
});

// Intermediate Step
gulp.task('copy-json', function() {
  return gulp.src('./src/**/*.json')
    .pipe(gulp.dest('./build'));
});

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