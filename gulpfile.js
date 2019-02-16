var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var concat = require('gulp-concat');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
//编译sass
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
})
//压缩css
gulp.task('minCss', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('./dist/css'))
})
//合并压缩js
gulp.task('minJs', function () {
    return gulp.src("./src/js/**/*.js")
        .pipe(uglify())
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./dist/js'))

})
gulp.task("build", gulp.parallel('minJs', 'minCss'));
//监听js和css
gulp.task('watch', function () {
    gulp.watch(["./src/sass/**/*.scss", "./src/js/**/*.js"], gulp.series('sass',
        'minJs'))
})
//开服务
gulp.task("server", function () {
    return gulp.src("src")
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true
        }))
})
gulp.task("default", gulp.series('minCss', 'minJs', 'watch'))