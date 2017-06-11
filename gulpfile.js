var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');


var paths = {
  scripts: ['public/js/**/*'],
  images: 'public/img/**/*',
  sass: 'public/sass/**/*',
  server: 'server/**/*',
  ejs: 'views/**/**/*'
};

gulp.task('compileScripts', () => {
    return gulp.src(paths.scripts)
        // .pipe(sourcemaps.init())
        // .pipe(coffee())
        // .pipe(uglify())
        .pipe(concat('all.min.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/public/js'))
});

gulp.task('minifyImages', () => {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/public/img'))
});

gulp.task('compileSass', () => {
    return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('dist/public/css'))
});

gulp.task('compileServer', () => {
    return gulp.src(paths.server)
        .pipe(gulp.dest('dist/server'))
});

gulp.task('compileEJS', () => {
    return gulp.src(paths.ejs)
        .pipe(gulp.dest('dist/views'))
});

gulp.task('watch', () => {
    gulp.watch(paths.images, ['minifyImages']);
    gulp.watch(paths.sass, ['compileSass']);
    gulp.watch(paths.server, ['compileServer']);
    gulp.watch(paths.ejs, ['compileEJS']);
    console.log('Running...');
    gulp.watch(paths.scripts, ['compileScripts']);
});


gulp.task('default', ['watch'])
