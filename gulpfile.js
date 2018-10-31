"use strict";

var gulp = require("gulp");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var del = require("del");
var server = require("browser-sync").create();
var run = require("run-sequence");
const jsminify = require("gulp-babel-minify");
const webp = require('gulp-webp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require('gulp-babel');

gulp.task("style", function () {
  gulp.src("css/*.css")
    .pipe(minify())
    .pipe(gulp.dest("docs/css"))
    .pipe(server.stream());
});

gulp.task("minify", () =>
  gulp.src("docs/scripts/scripts.js")
    .pipe(jsminify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest("docs/scripts"))
);

gulp.task('uglify', function (cb) {
  pump([
      gulp.src('docs/scripts/scripts.js'),
      uglify(),
      gulp.dest('docs/scripts')
    ],
    cb
  );
});

gulp.task('babel', function() {
    gulp.src('scripts/scripts.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('docs/scripts'))}
);

gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("docs"));
});

gulp.task("images", function () {
  return gulp.src("assets/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('docs/assets'));
});

gulp.task('webp', () =>
  gulp.src('assets/webp/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('docs/assets'))
);

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**",
    "favicon.ico"
  ], {
    base: "."
  })
    .pipe(gulp.dest("docs"));
});

gulp.task("clean", function () {
  return del("docs");
});

gulp.task("serve", function() {
  server.init({
    server: "docs/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("*.css", ["style"]);
  gulp.watch("*.js)", ["js"]).on("change", server.reload);
  gulp.watch("*.html", ["html"]).on("change", server.reload);
});

gulp.task("build", function (done) {
  run("clean", "copy", "style","babel", "minify", "uglify", "images",  "webp", "html", done);
});
