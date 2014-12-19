var gulp = require("gulp");
var compass = require('gulp-compass');
var frontnote = require("gulp-frontnote");
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var plumber = require("gulp-plumber");

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./htdocs/"
        }
    });
});

gulp.task('compass', function() {
  gulp.src('sass/**/*scss')
	.pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: 'htdocs/wp-content/themes/senna/css/',
      sass: 'sass'
    }))
    .pipe(frontnote({
        css: 'htdocs/wp-content/themes/senna/css/style.css'
    }))
    .pipe(gulp.dest('htdocs/wp-content/themes/senna/css'))
    .pipe(reload({stream:true}));
});

gulp.task("default", ['compass', 'browser-sync'], function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["compass"]);
});

