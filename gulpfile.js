/*
*  Altair Admin (AngularJS)
*  Automated tasks ( http://gulpjs.com/ )
*/

var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({
        pattern: ['gulp-*', 'gulp.*', '*'],
        replaceString: /\bgulp[\-.]/
    });

// browser sync
var bs_angular = require('browser-sync').create('altair_angular');

// chalk error
var chalk = require('chalk');
var chalk_error = chalk.bold.red;

// get altair version
var pjson = require('./package.json');
var version = pjson.version;

// 1. -------------------- MINIFY/CONCATENATE JS FILES --------------------

gulp.task('common:js', function () {
    return gulp.src([
        "bower_components/jquery/dist/jquery.js",
        "bower_components/modernizr/modernizr.js",
        // moment
        "bower_components/moment/moment.js",
        // fastclick (touch devices)
        "bower_components/fastclick/lib/fastclick.js",
        // custom scrollbar
        "bower_components/jquery.scrollbar/jquery.scrollbar.js",
        // create easing functions from cubic-bezier co-ordinates
        "bower_components/jquery-bez/jquery.bez.min.js",
        // Get the actual width/height of invisible DOM elements with jQuery
        "bower_components/jquery.actual/jquery.actual.js",
        // waypoints
        "bower_components/waypoints/lib/jquery.waypoints.js",
        // velocityjs (animation)
        "bower_components/velocity/velocity.js",
        "bower_components/velocity/velocity.ui.js",
        // advanced cross-browser ellipsis
        "bower_components/jQuery.dotdotdot/src/js/jquery.dotdotdot.js",
        // hammerjs
        "bower_components/hammerjs/hammer.js",
        // scrollbar width
        "assets/js/custom/jquery.scrollbarWidth.js",
        // jquery.debouncedresize
        "bower_components/jquery.debouncedresize/js/jquery.debouncedresize.js",
        // screenfull
        "bower_components/screenfull/dist/screenfull.js"
    ]).pipe(plugins.concat('common.js'))
        .on('error', function(err) {
            console.log(chalk_error(err.message));
            this.emit('end');
        })
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('common:js:min', ['common:js'], function() {
    return gulp.src([
        'assets/js/common.js'
        ])
        .pipe(plugins.uglify({
            mangle: true
        }))
        .pipe(plugins.rename('common.min.js'))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest('assets/js/'));
});

// cutom uikit
gulp.task('uikit:js', function () {
    return gulp.src([
        // uikit core
        "bower_components/uikit/js/uikit.js",
        // uikit components
        "bower_components/uikit/js/components/accordion.js",
        "bower_components/uikit/js/components/autocomplete.js",
        "assets/js/custom/uikit_datepicker.js",
        "bower_components/uikit/js/components/form-password.js",
        "bower_components/uikit/js/components/form-select.js",
        "bower_components/uikit/js/components/grid.js",
        "bower_components/uikit/js/components/lightbox.js",
        "bower_components/uikit/js/components/nestable.js",
        "bower_components/uikit/js/components/notify.js",
        "bower_components/uikit/js/components/sortable.js",
        "assets/js/custom/uikit_sticky.js",
        "bower_components/uikit/js/components/tooltip.js",
        "assets/js/custom/uikit_timepicker.js",
        "bower_components/uikit/js/components/upload.js",
        "assets/js/custom/uikit_beforeready.js"
    ])
        .pipe(plugins.concat('uikit_custom.js'))
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('uikit:js:min', ['uikit:js'], function() {
    return gulp.src([
        'assets/js/uikit_custom.js'
        ])
        .pipe(plugins.uglify({
            mangle: true
        }))
        .pipe(plugins.rename('uikit_custom.min.js'))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('custom:js:min', function () {
    return gulp.src([
        'assets/js/custom/*.js',
        '!assets/js/**/*.min.js'
    ])
        .pipe(plugins.uglify({
            mangle: true
        }))
        .pipe(plugins.rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

// -------------------- LESS TO CSS --------------------

gulp.task('custom:styles', function() {
    return gulp.src('assets/less/main.less')
        .pipe(plugins.less())
        .on('error', function(err) {
            console.log(chalk_error(err.message));
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: ['> 5%','last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('custom:styles:min', ['custom:styles'], function() {
    return gulp.src('assets/css/main.css')
        .pipe(bs_angular.stream())
        .pipe(plugins.minifyCss({
            keepSpecialComments: 0,
            advanced: false
        }))
        .pipe(plugins.rename('main.min.css'))
        .pipe(gulp.dest('assets/css'));
});

// -------------------- MINIFY JSON --------------------

gulp.task('custom:json', function() {
    return gulp.src([
            'data/*.json',
            '!data/*.min.json'
        ])
        .pipe(plugins.jsonminify())
        .on('error', function(err) {
            console.log(chalk_error(err.message));
            this.emit('end');
        })
        .pipe(plugins.rename({
            extname: ".min.json"
        }))
        .pipe(gulp.dest('data/'));
});

gulp.task('custom:app', function() {
    return gulp.src([
        'app/app.js',
        'app/*.js',
        'app/**/*.module.js',
        'app/**/*.js'
        ])
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('custom:app:min', ['custom:app'], function() {
    return gulp.src('assets/src/app.js')
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(plugins.rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('custom', ['custom:app:min', 'custom:styles:min', 'custom:json']);

// -------------------- BROWSER SYNC http://www.browsersync.io/docs/ --------------------
gulp.task('serve', function() {

    bs_angular.init({
        server: './',
        index: 'index.html'
    });

    gulp.watch([
        'assets/less/**/*.less',
        '!assets/less/pages/error_page.less',
        '!assets/less/pages/login_page.less'
    ],['custom:styles:min']);

    gulp.watch([
        'gulpfile.js',
        'index.html',
        'app/**/*',
        '!app/**/*.min.js'
    ], ['custom:app:min', 'serve:reload']);

});

gulp.task('serve:reload', function() {
    bs_angular.reload();
});

// -------------------- DEFAULT TASK ----------------------
gulp.task('build', ['custom', 'common:js:min', 'uikit:js:min']);

gulp.task('default', ['build', 'serve']);