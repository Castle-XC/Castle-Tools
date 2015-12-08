
// include gulp
var gulp = require('gulp');

// include plugins
var sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    neat = require('node-neat').includePaths,
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

//variables

var paths = {
    root: '../',
    //src:  '../FE-Tools/',
    //dest: '../Assets/',
    src: {
        styles: '../FE-Tools/scss/',
        scripts: '../FE-Tools/scripts/'
    },
    dest: {
        styles: '../Assets/styles/',
        scripts: '../Assets/scripts/'
    }
};

// Task used for cleanup of generated files
gulp.task('clean', function () {
    "use strict";

    return del(
        [
            paths.dest.styles + '**/*.css',
            paths.dest.scripts + '**/*.js'
        ],
        {force: true}
    );
});

// Task: Compile Sass
// Includes: Uncompressed CSS with SourceMaps
gulp.task('styles', function () {
    "use strict";

    gulp.src(paths.src.styles + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: "-generated"
        }))
        .pipe(gulp.dest(paths.dest.styles));
        // .pipe(notify({ message: 'Task "styles" has finished.' }));
});

// Task: Compile Sass for production
// Includes: Compressed .CSS, no SourceMaps
gulp.task('styles:prod', function () {
    "use strict";

    gulp.src(paths.src.styles + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['styles'].concat(neat),
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            suffix: '-generated'
        }))
        .pipe(gulp.dest(paths.dest.styles));
        // .pipe(notify({ message: 'Task "styles:prod" has finished.' }));
});

gulp.task('scripts', function () {
    "use strict";

    return gulp.src(paths.src.scripts + '**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts-generated.js'))
        .pipe(gulp.dest(paths.dest.scripts))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest.scripts));
        // .pipe(notify({ message: 'Task "scripts" has finished.'}));
});

// Task: Watch files for changes
gulp.task('watch', function () {
    "use strict";
    // Watch for changes to .scss files
    gulp.watch(paths.src.styles + '**/*.scss', ['styles']);
    // Watch for changes to .js files
    gulp.watch(paths.src.scripts + '**/*.js', ['scripts']);
});

//Build task: Clean out the /Assets/ folder,
// compile styles, bundle scripting and then watch for changes
gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'watch');
});

//Build Task for PRoduction, no watch necessary
gulp.task('build:prod', ['clean'], function() {
    gulp.start('styles:prod', 'scripts');
});

// Default task is the same as build
gulp.task('default', ['build']);