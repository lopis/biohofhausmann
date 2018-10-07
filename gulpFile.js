const gulp = require('gulp')
const markdown = require('gulp-markdown')
const fs = require('fs')
const concat = require('gulp-concat')
const del = require('del')
const wrapper = require('gulp-wrapper')
const watch = require('gulp-watch')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify-es').default

const files = fs.readdirSync('./sections/')

function getTasks() {
  const tasks = []
  files.map(file => {
    tasks.push(`markdown_${file}`)
    gulp.task(`markdown_${file}`, () => {
      return gulp.src(`./sections/${file}`)
        .pipe(markdown())
        .pipe(wrapper({
          header: '<section>',
          footer: '</section>'
        }))
        .pipe(gulp.dest('./build/'))
    })
  })

  return tasks
}

gulp.task('merge', () => {
  return gulp.src('./build/*.html')
    .pipe(concat('markdown.html'))
    .pipe(wrapper({
      header: '<div class="content">',
      footer: '</div>'
    }))
    .pipe(gulp.dest('./build/'))
})

gulp.task('build', () => {
  return gulp.src([
      './src/partials/site_start.html',
      './src/partials/menu.html',
      './src/partials/landing_page.html',
      './build/markdown.html',
      './src/partials/footer.html',
      './src/partials/site_end.html'
    ])
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('assets', () => {
  return gulp.src('./img/*')
    .pipe(gulp.dest('./dist'))
})

gulp.task('clean', () => {
  return del([
    'build/*'
  ]);
})

gulp.task('watch', function () {
  return gulp.watch(
    ['./src/**/*', './sections/*'],
    gulp.parallel(['dev'])
  )
})

gulp.task('build-js-dev', (done) => {
	return gulp.src('./src/*.js')
  	.pipe(concat('main.js'))
  	.pipe(gulp.dest('./dist'));
});

gulp.task('build-js', (done) => {
	return gulp.src('./src/*.js')
  	.pipe(concat('main.js'))
    .pipe(uglify())
  	.pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./src/css/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
})

gulp.task('default', gulp.series([
  'clean',
  getTasks(),
  'merge',
  'build',
  'build-js',
  'assets',
  'sass',
  done => done()
]));

gulp.task('dev', gulp.series([
  'clean',
  getTasks(),
  'merge',
  'build',
  'build-js-dev',
  'assets',
  'sass',
  'watch',
  done => done()
]));
