let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let sass = require('gulp-sass');
let browserify = require('browserify');
let babelify = require('babelify');
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
            includePaths: [__dirname + '/node_modules/'],
            outputStyle: 'compressed',
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/app/css/'))
});
//  browserify /src/code/script/client.js -o bundle.js -t [ babelify --presets [ env ] ]
gulp.task('build', () => {
    let b = browserify("./src/code/script/client.js")
        .transform("babelify", {presets: ["env", "es2015"]});
    return b.bundle()
        .pipe(source('./src/app/js/'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add other gulp transformations (eg. uglify) to the pipeline here.
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js/'));
    /*return gulp.src('./src/code/script/client.js', {read: false})
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(tap((file) => {
            file.contents = browserify(file.path, {
                debug: true
            }).transform(babel, {
                presets: ['es2015']
            }).bundle();
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/app/js/'));*/
});
gulp.task('watch', function () {
    gulp.watch('./src/code/**/*.js', ['build']);
    gulp.watch('./src/code/**/*.scss', ['sass']);
    gulp.watch('./src/app/**/*.*', browserSync.reload);
});

gulp.task('default', ['prebuild', 'build', 'sass', 'watch']);
