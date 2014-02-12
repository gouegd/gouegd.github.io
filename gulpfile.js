var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var coffee = require('gulp-coffee');

var coffeeGlob = './coffee/**/*.coffee';

gulp.task('default', function(){
  gulp.run('coffee');

  // Watch files and run tasks if they change
  gulp.watch(coffeeGlob, function() {
    gulp.run('coffee');
  });
});

gulp.task('coffee', function() {
  gulp.src(coffeeGlob)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});
