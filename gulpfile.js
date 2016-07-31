// //////////////////////////
// Required 
// //////////////////////////

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	rename = require('gulp-rename');

// //////////////////////////
// html tasks
// //////////////////////////
gulp.task('html',function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream: true}));
});


// //////////////////////////
// scripts 
// //////////////////////////



gulp.task('scripts', function(){
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream: true}));
});

// //////////////////////////
// watch
// //////////////////////////
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js',['scripts']);
	gulp.watch('app/scss/**/*.scss',['compass']);
	gulp.watch('app/**/*.html',['html']);
});


// //////////////////////////
// compas - sass
// //////////////////////////
gulp.task('compass', function(){
	gulp.src('app/scss/style.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: './config.rb',
		css:'app/css',
		sass: 'app/scss',
		require: ['susy']
	}))
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('app/css/'))
	.pipe(reload({stream: true}));
});

// //////////////////////////
// build
// //////////////////////////


// //////////////////////////
// browser sync
// //////////////////////////

gulp.task('browser-sync',function(){
	browserSync({
		server:{
			baseDir: "./app/"
		}
	});
});


// //////////////////////////
// default 
// //////////////////////////

gulp.task('default',['scripts','browser-sync',
		  'html','compass', 'watch']);