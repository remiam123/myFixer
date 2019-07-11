const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src("./src/sass/**/*.sass")
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(
      cleanCSS({
        compatibility: "ie8"
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return gulp
    .src("./src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
}

function img() {
  return gulp.src("src/img/*").pipe(gulp.dest("dist/img"));
}

function template() {
  return gulp
    .src("./src/**/index.pug")
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

async function build() {
  await style();
  await jsTask();
  await img();
  await template();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "index.html"
    }
  });
  gulp.watch("./src/sass/**/*.sass", style);
  gulp.watch("./src/**/*.pug", template);
  gulp.watch("./src/js/*.js", jsTask);
}

exports.style = style;
exports.template = template;
exports.build = build;
exports.watch = watch;
exports.default = build;
