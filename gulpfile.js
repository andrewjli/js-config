var gulp = require('gulp');

gulp.task('jscs', function () {
    var jscs = require('gulp-jscs');
    gulp.src('js/*.js')
        .pipe(jscs());
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');
    gulp.src('js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});
