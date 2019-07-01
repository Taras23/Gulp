var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

//exports.hi = printHello;

function cssStyle(done){

    gulp.src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle:"compressed"
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        browsers:['last 2 version'],
        cascade: false
    }))
    .pipe(rename({suffix:'.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());

    done();
}
function sync(done){
    browserSync.init({
        server: {
            baseDir:"./"
        },
        port: 3000
    });

    done();
}


function browserReload(done){
browserSync.reload();
    done();
}

function watchSass(){
    gulp.watch("./scss/**/*",cssStyle);
}

function watchFiles(){
    gulp.watch("./scss/**/*",cssStyle);
    gulp.watch("./**/*.html",browserReload);
}
//gulp.task(cssStyle);
//gulp.task(hi);
gulp.task('default',gulp.parallel(sync,watchFiles));
gulp.task(sync);