var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');


// compile Sass files
gulp.task('sass', function() {
  return gulp.src('scss/tinyone.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest(''))
    .pipe(browserSync.reload({
        stream: true
    }))
});


// minify css
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('css/*.css')
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});


// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('lib/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('lib/jquery'))

    gulp.src(['node_modules/font-awesome/fonts/*'])
          .pipe(gulp.dest('lib/font-awesome/fonts'))

    gulp.src([
            'node_modules/font-awesome/css/*',
            '!node_modules/font-awesome/css/*.map',
        ])
        .pipe(gulp.dest('lib/font-awesome/css'))


    gulp.src([
            'node_modules/aos/dist/*',
            '!node_modules/aos/dist/*.map'
          ])
          .pipe(gulp.dest('lib/aos'))

})


// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})


// reload browser on any file change
gulp.task('watch', ['browserSync', 'sass', 'minify-css'], function() {
  gulp.watch('scss/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
});


// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);
