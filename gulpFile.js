const gulp = require('gulp')
const markdown = require('gulp-markdown')
const fs = require('fs')
const concat = require('gulp-concat')
const del = require('del')
const wrapper = require('gulp-wrapper')

const files = fs.readdirSync('./sections/')

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

gulp.task('merge', () => {
  return gulp.src('./build/*.html')
    .pipe(concat('markdown.html'))
    .pipe(gulp.dest('./build/'))
})

gulp.task('build', () => {
  return gulp.src([
      './src/partials/site_start.html',
      './src/partials/menu.html',
      './build/markdown.html',
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

gulp.task('default', gulp.series([
  ...tasks,
  'merge',
  'build',
  'assets',
  'clean',
  done => done()
]));
