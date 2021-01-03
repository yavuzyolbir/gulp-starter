const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    fileinclude = require('gulp-file-include'),
    beautify = require('gulp-beautify');


// ROOTS
const srcRoot = './src/',
    nodeRoot = 'node_modules/',
    scss = srcRoot + 'scss/',
    js = srcRoot + 'js/',
    publicRoot = './public_html/',
    cssDest = publicRoot + 'assets/css/',
    jsDest = publicRoot + 'assets/js/',
    components = srcRoot + 'components/**/*.html',
    pages = srcRoot + 'pages/**/*.html',
    styleWatchFiles = scss + '**/*.scss';


// JAVASCRIPT PLUGINS
const jsSRC = [
    nodeRoot + 'zepto/dist/zepto.min.js',
    nodeRoot + 'vanilla-lazyload/dist/lazyload.min.js'
];


// MAIN JS
const mainJsSRC = [
    js + 'main.js'
];


// CSS
css = () => {
    return gulp.src([scss + 'main.scss'])
        .pipe(concat('main.min.scss'))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.stream());
}


// JS PLUGINS BUNDLE
JsPlugins = () => {
    return gulp.src(jsSRC)
        .pipe(concat('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(browserSync.stream());
}


// MAIN JS MINIFY
mainJs = () => {
    return gulp.src(mainJsSRC)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('../js'))
        .pipe(gulp.dest(jsDest))
        .pipe(browserSync.stream());
}


// WATCH
watch = () => {
    browserSync.init({
        server: {
            baseDir: "./public_html"
        },
        notify: false
    });
    gulp.watch(styleWatchFiles, gulp.series(css));
    gulp.watch(jsSRC, JsPlugins);
    gulp.watch(mainJsSRC, mainJs);
    gulp.watch([components, pages]).on('change', fileInclude);

}


// FILE INCLUDE ( FOR COMPONENTS INCLUDE )
fileInclude = () => {
    return gulp.src(pages)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(beautify.html({ indent_size: 2 }))
        .pipe(gulp.dest(publicRoot))
        .pipe(browserSync.stream());
}


const build = gulp.parallel([css, JsPlugins, mainJs, fileInclude, watch]);
gulp.task('default', build);
