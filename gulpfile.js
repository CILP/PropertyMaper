var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    shell = require('gulp-shell');

gulp.task('pre-test', function () {
  return gulp.src('./lib/property-maper.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src('test/pmSpec.js')
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 98 } }));
});

gulp.task('update', ['test'], function(){
  console.log("Se publica");
});

gulp.task('shorthand', shell.task([
  'echo El paquete se va a publicar',
  'echo world'
]))
