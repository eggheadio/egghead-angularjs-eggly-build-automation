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

gulp.task('clean', function (callback) {
  del(['./build'], {force: true}, callback)
});

gulp.task('copy-build', ['copy-assets', 'copy-app-js', 'copy-vendor-js']);

gulp.task('copy-assets', function () {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('copy-app-js', function () {
  return gulp.src(files.app_files.js)
    .pipe(gulp.dest('./build'));
});