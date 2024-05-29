'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
function defaultTask() {
    return gulp.src('./css/styles.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
}

exports.default = defaultTask;

exports.watch = function () {
    gulp.watch('./css/styles.less', gulp.series('default'));
};