const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('dev', ['sass', 'scripts', 'copy'], () => {
  browserSync.init({
    notify: true,
    server: {
      baseDir: './app',
    },
  });

  gulp.watch('./app/index.html', () => {
    browserSync.reload();
  });

  gulp.watch('./app/sass/**/*.scss', ['injectCss']);
  gulp.watch('./app/js/**/*.js', ['reloadScripts']);
});

gulp.task('injectCss', ['sass'], () => (
  gulp.src('./app/temp/styles.css')
    .pipe(browserSync.stream())
));

gulp.task('reloadScripts', ['scripts'], () => {
  browserSync.reload();
});

gulp.task('copy', () => {
  gulp.src('./app/assets/**/*')
    .pipe(gulp.dest('./app/temp/assets/'));
});
