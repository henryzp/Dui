var gulp = require("gulp"),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

gulp.task("build-css", function () {

    return gulp.src(['./src/css/dui.all.scss','./src/css/dui.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css'));

});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        gulp.src("./dist/js/dui.js")
            .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(uglify())    //压缩
            .pipe(gulp.dest('./dist/js'))
            .pipe(gzip())
            .pipe(gulp.dest('./dist/js'));
        callback();
    });
});

//发布
gulp.task('default', ['build-js', 'build-css']);
