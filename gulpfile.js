var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

const buildTasks = ['sass'];
const watchTasks = ['sass:watch']

gulp.task('default', buildTasks.concat(watchTasks));

gulp.task('build', buildTasks);

gulp.task('watch', watchTasks);

gulp.task('sass', function () {
  return gulp.src(['./sass/**/*.scss', ])
    .pipe(concat('bundle.min.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
