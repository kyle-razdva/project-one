const { watch, series, parallel, dest, src } = require('gulp');
const BrowserSync = require('browser-sync').create();

// Gulp plugins
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const pug = require('gulp-pug');
const image = require('gulp-image');
const rename = require('gulp-rename');
// const cssmin = require('gulp-cssnano');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const svgsprite = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');

sass.compiler = require('node-sass')

// Tasks groups
const buildTasks = parallel(
  scriptBuilder,
  styleBuilder,
  viewBuilder,
  iconBuilder,
  imageBuilder
);

const watchTasks = parallel(
  styleWatcher,
  scriptWatcher,
  iconWatcher,
  imageWatcher,
  viewWatcher
);

const defaultTask = series(
  cleanDist,
  vendorsBuilder,
  buildTasks,
  browserSync,
  watchTasks
);

// Tasks
function browserSync() {
  BrowserSync.init({
    server: {
      baseDir: './public'
    }
  });
  return Promise.resolve();
}

function viewBuilder() {
  return src('src/views/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('public'));
}

function styleBuilder() {
  return src('src/styles/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(prefix({
      browsers: ['last 2 versions']
    }))
    .pipe(rename('main.css'))
    .pipe(dest('public/static'))

    // For prod build
    // .pipe(cssmin())
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    // .pipe(dest('public/static'))

    .pipe(BrowserSync.reload({
      stream: true
    }));
}

function scriptBuilder() {
  return src([
    'src/scripts/index.js',
    '!node_modules/'
  ]).pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest('public/static'));
}

function iconBuilder() {
  return src('src/assets/icons/*.svg')
    .pipe(plumber())
    .pipe(svgsprite({
      mode: {
        css: {
          render: {
            css: true
          }
        }
      }
    }))
    .pipe(dest('public/static/icons'))
}

function imageBuilder() {
  return src('src/assets/images/*')
    .pipe(image())
    .pipe(dest('public/static/images'))
}

function vendorsBuilder() {
  return src('src/assets/vendors/**/*')
    .pipe(dest('public/static/libs'))
}

function cleanDist() {
  return src('public', {
    allowEmpty: true,
    read: false
  }).pipe(clean());
}

// Watchers
function scriptWatcher() {
  return watch('src/scripts/**/*.js', scriptBuilder)
    .on('change', BrowserSync.reload);
}

function viewWatcher() {
  return watch('src/views/**/*.pug', viewBuilder)
    .on('change', BrowserSync.reload);
}

function styleWatcher() {
  return watch('src/styles/**/*.scss', styleBuilder);
}

function iconWatcher() {
  return watch('src/assets/icons/*', series(iconBuilder, viewBuilder));
}

function imageWatcher() {
  return watch('src/assets/images/*', series(imageBuilder, viewBuilder));
}

// Exports
exports.default = defaultTask;

