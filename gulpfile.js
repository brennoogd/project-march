const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-csso')
const browserSync = require('browser-sync').create()

function css() {
  return src('./src/sass/style.scss')
    .pipe(sass())
    .pipe(dest('src/css'))
}

function compactCSS() {
  return src('./src/sass/style.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('src/css'))
}

function serve() {
  browserSync.init({
    server: "./src/"
  })

  watch("./src/sass/**/*.scss", css)
  watch(["./src/*.html", "./src/sass/**/*.scss"]).on('change', browserSync.reload)
}

exports.serve = serve
exports.css = css
exports.default = series(css, serve)