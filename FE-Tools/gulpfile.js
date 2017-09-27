
// include gulp
var gulp = require('gulp');

// include plugins
var sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    bourbon = require('bourbon').includePaths,
    neat = require('bourbon-neat').includePaths,
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

//variables

var paths = {
    root: '../',
    src: {
        styles: '../FE-Tools/scss/',
        scripts: {
            custom: '../FE-Tools/scripts/custom/',
            vendor: '../FE-Tools/scripts/vendor/'
        }
    },
    dest: {
        styles: '../generated/styles/',
        scripts: '../generated/scripts/'
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
            includePaths: ['styles'].concat(bourbon, neat)
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
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
            includePaths: ['styles'].concat(bourbon, neat),
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename({
            suffix: '-generated'
        }))
        .pipe(gulp.dest(paths.dest.styles));
        // .pipe(notify({ message: 'Task "styles:prod" has finished.' }));
});

gulp.task('scripts:custom', function () {
    "use strict";

    return gulp.src(paths.src.scripts.custom + '**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts-generated.js'))
        .pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('scripts:custom:prod', function() {
    "use strict";
    
    return gulp.src(paths.src.scripts.custom + '**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('scripts-generated.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('scripts:vendor', function () {
    "use strict";

    return gulp.src(paths.src.scripts.vendor + '**/*.js')
        .pipe(concat('scripts-vendor-generated.js'))
        .pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('scripts:vendor:prod', function () {
    "use strict";

    return gulp.src(paths.src.scripts.vendor + '**/*.js')
        .pipe(concat('scripts-vendor-generated.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest.scripts));
});

// Task: Watch files for changes
gulp.task('watch', function () {
    "use strict";
    // Watch for changes to .scss files
    gulp.watch(paths.src.styles + '**/*.scss', ['styles']);
    // Watch for changes to .js files
    gulp.watch(paths.src.scripts.custom + '**/*.js', ['scripts:custom']);
});

// Build task: Clean out the /Assets/ folder,
// (clean generated folders, compile css with source maps,
// bundle scripting, watch for changes to scss & js, nothing is minified)
gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts:custom', 'scripts:vendor', 'watch');
});

//Build Task for Production
//(no watch, no source maps, everything minified)
gulp.task('build:prod', ['clean'], function() {
    gulp.start('styles:prod', 'scripts:custom:prod', 'scripts:vendor:prod');
});

// Default task is the same as build
gulp.task('default', ['build']);
