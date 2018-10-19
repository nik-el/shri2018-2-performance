const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
const babel = require('gulp-babel');
var imagemin = require("gulp-imagemin");
var csso = require('gulp-csso');
const minify = require("gulp-babel-minify");

gulp.task("minifyjs", () =>
  gulp.src("js/*.js")
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest("./docs"))
);



gulp.task('csso', function () {
  return gulp.src('./bootstrap.css')
    .pipe(csso())
    .pipe(gulp.dest('./docs'));
});

gulp.task('default', () =>
  gulp.src('js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./docs'))
);

gulp.task('minify', () => {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('compress', function (cb) {
  pump([
      gulp.src('js/*.js'),
      uglify(),
      gulp.dest('docs')
    ],
    cb
  );
});

gulp.task("images", function () {
  return gulp.src("assets/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('docs/assets'));
});