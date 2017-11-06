var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	rename = require("gulp-rename"),
	uncss = require('gulp-uncss'),
	cssbeautify = require('gulp-cssbeautify'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	server = require('gulp-server-livereload'),
	browserSync = require('browser-sync');


/* js files */
gulp.task("jsFiles", function() {
	gulp.src("js/*.js")
	    .pipe(concat("main.js"))
	    .pipe(gulp.dest("out/"));
});

/* css files */
gulp.task("cssFiles", function() {
	gulp.src("css/*.css")    
	    .pipe(concatCss("bundle.css"))
	    .pipe(cleanCSS({compatibility: 'ie8'}))
	    .pipe(rename("bundle.min.css"))
	    .pipe(autoprefixer({
            	browsers: ['last 20 versions'],
            	cascade: false
        	}))
	    .pipe(uncss({
	       	    html: ["index.html"]
	    	}))
	    .pipe(gulp.dest("out/"))
	    .pipe(browserSync.reload({stream: true}));
});

/* image files */
gulp.task("imgFiles", function() {
	gulp.src("img/*")
		.pipe(imagemin())
        .pipe(gulp.dest("out/"));
});

gulp.task('webserver', function() {
    gulp.src('')
        .pipe(server({
            livereload: true,
            defaultFile: 'index.html',
            directoryListing: false,
            open: false
    }));
});

gulp.task("browser-sync", function() {
	browserSync({ 
        server: { 
            baseDir: 'out/' 
        },
        notify: false 
    });

});

gulp.task("watch", ["browser-sync", "jsFiles", "cssFiles", "imgFiles"/*, "webserver"*/], function() {
	gulp.watch('out/*.html', browserSync.reload);
});
 
gulp.task('default', ["watch"]);

