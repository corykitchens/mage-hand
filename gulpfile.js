// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");


// Compile + Concat Our Sass
gulp.task("sass", function() {
    return gulp.src("public/stylesheets/src/**/*.scss")
        .pipe(concat("main.css"))
        .pipe(sass())
        .pipe(gulp.dest("public/stylesheets/"));
});

// Concatenate & Minify JS

gulp.task("scripts", function() {
    return gulp.src(["public/js/vendor/*.js", "public/js/core.js"])
        .pipe(rename("main.js"))
        .pipe(concat("main.js"))
        .pipe(gulp.dest("public/js"))
        // .pipe(rename("main.min.js"))
        // .pipe(uglify())
        // .pipe(gulp.dest("public/js/min"));
});

// Watch Files For Changes
gulp.task("watch", function() {
    gulp.watch("public/js/**/*.js", ["scripts"]);
    gulp.watch("public/stylesheets/src/**/*.scss", ["sass"]);
});


// Default Task
gulp.task("default", ["sass", "scripts", "watch"]);
