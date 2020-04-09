const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass');
const rename       = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const htmlmin      = require('gulp-htmlmin');
 
// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('styles', function(){
    return gulp.src("src/sass/**/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("src/js/*.js").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));