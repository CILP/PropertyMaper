var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    shell = require('gulp-shell'),
    fs = require('fs'),
    packjson = fs.readFileSync('package.json', 'utf8'),
    spawn = require('child_process').spawn;

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

gulp.task('default', function(){
  gulp.watch('./lib/property-maper.js', ['update']);
});

function updateModule(cb){

  var json = JSON.parse(packjson),
      splitVersion = json.version.split('.'),
      nextVersion = parseInt(splitVersion[2]) + 1;

  splitVersion[2] = nextVersion;

  var newVersion = splitVersion.join('.');

  packjson = packjson.replace(new RegExp(json.version), newVersion);

  fs.writeFile("package.json", packjson, function(err) {
    if(err) {
      cb(err, null);
    } else {
      cb(null, newVersion);
    }
  });
}

gulp.task('update', ['test'], function(){
  updateModule(function(err, version){
    if (err){
      console.log(err);
      return err;
    } else {
      spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', function(){
        console.log("Published :)");
      });
      return;
    }
  });
});
