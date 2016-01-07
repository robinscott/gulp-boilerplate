var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var config = {
    bowerDir: './bower_components',
    sassSrc: './app/sass/main.scss',
    sassDist: './dist/css',
    jsSrc: 'app/scripts/**/*.js',
    jsDist: 'dist/js'
};

gulp.task('styles', function () {
    gulp.src(config.sassSrc)
        .pipe(plugins.sass({
            outputStyle: 'compressed',
            includePaths: config.bowerDir + '/normalize-scss/'
        }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer('last 2 version'))
        .pipe(gulp.dest(config.sassDist))
        .pipe(plugins.notify({
            message: 'Styles task complete'
        }));
});

gulp.task('scripts', function() {
    return gulp.src(config.jsSrc)
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest(config.jsDist))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.jsDist))
        .pipe(plugins.notify({ message: 'Scripts task complete' }));
});