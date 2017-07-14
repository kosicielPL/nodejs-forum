const gulp = require('gulp');
const mocha = require('gulp-mocha');
const exit = require('gulp-exit');
const istanbul = require('gulp-istanbul');

gulp.task('pre-test', () => {
    return gulp.src(['./data/**/*.js',
            './db/**/*.js',
            './server/**/*.js',
            './config/**/*.js',
            './models/**/*.js',
        ])
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
        .pipe(istanbul.writeReports())
        .pipe(exit());
});

gulp.task('test:integration', ['pre-test'], () => {
    return gulp.src('./tests/integration/**/*.js')
        .pipe(mocha({
            reporter: 'list',
        }))
        .pipe(istanbul.writeReports())
        .pipe(exit());
});

gulp.task('test:all', ['pre-test'], () => {
    return gulp.src([
            './tests/unit/**/*.js',
            './tests/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'list',
        }))
        .pipe(istanbul.writeReports())
        .pipe(exit());
});
