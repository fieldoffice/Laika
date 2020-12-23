'use strict';

// Requirements
var 
    gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    terser      = require('gulp-terser'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    plumber     = require('gulp-plumber'),
    cssnano     = require('gulp-cssnano'),

// File paths
var paths = {
    styles: {
        src:    "src/**/*.scss",
        dest:   "assets/css"
    },
    scripts: {
        src:    "src/js/*.js",
        dest:   "assets/js"  
    }
};

// Compile SASS
gulp.task('styles', function() {
    return gulp
        .src(paths.styles.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('main.css'))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('minify', function() {
  return gulp.src('assets/css/main.css')
    .pipe(cssnano())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
});

// Lint
gulp.task('lint', function() {
    return gulp
        .src(paths.scripts.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

// Concatenate and minify JS
gulp.task('scripts', function() {
    return gulp
        .src(paths.scripts.src)
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(terser())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch(paths.styles.src, gulp.series('styles', 'minify'));
    gulp.watch(paths.scripts.src, gulp.series('lint', 'scripts'));
});