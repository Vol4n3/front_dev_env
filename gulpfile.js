let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let buffer = require('gulp-buffer');
let uglify = require('gulp-uglify');
let tap = require('gulp-tap');
let sass = require('gulp-sass');
let browserify = require('browserify');
let babel = require('babelify');
let autoprefixer = require('gulp-autoprefixer');
let plumber = require('gulp-plumber');
let browserSync = require('browser-sync').create();

gulp.task('prebuild', () => {
    browserSync.init({
        proxy: "localhost:8081"
    });
});
// sass
gulp.task('sass', function () {
    return gulp.src('./src/code/scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/app/css/'))
});
gulp.task('build', () => {

    return gulp.src('./src/code/script/client.js', {read: false})
        .pipe(plumber())
        .pipe(tap((file) => {

            file.contents = browserify(file.path, {
                debug: true
            }).transform(babel, {
                presets: ['es2015']
            }).bundle();
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/app/js/'));
});
gulp.task('watch', function () {
    gulp.watch('./src/code/**/*.js', ['build']);
    gulp.watch('./src/code/**/*.scss', ['sass']);
    gulp.watch('./src/app/**/*.*', browserSync.reload);
});

gulp.task('default', ['prebuild', 'build', 'sass', 'watch']);
