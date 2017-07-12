const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('pre-test', ()=>{
    return gulp.src(['./data/**/*.js',
        './db/**/*.js',
        './server/**/*.js',
        './config/**/*.js',
        './models/**/*.js'])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test:unit', ['pre-test'], () => {
    return gulp.src('./tests/unit/**/*.js')
        .pipe(mocha({
            reporter: 'list',
        }))
        .pipe(istanbul.writeReports());
});
