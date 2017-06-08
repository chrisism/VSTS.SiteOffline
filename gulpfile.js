const gulp = require('gulp');
var replace = require('gulp-replace');
var gulpSequence = require('gulp-sequence');
const shell = require('gulp-shell')

var spawnSync = require('child_process').spawnSync;
var del = require('del');

gulp.task('clean', () => {
    return del(['_build/']);
});

var gitVersionObj;
gulp.task('getVersion', () => {

    var cmd = spawnSync('gitversion', []);
    gitVersionObj = JSON.parse(cmd.stdout.toString())
    return;
});

gulp.task('copyTokenizedFiles', () => {

    var packageVersion = gitVersionObj.MajorMinorPatch;
    
    return gulp.src([
        './Task/task.json',
        './vss-extension.json'], {base : "./" })
        .pipe(replace("__VERSION__", packageVersion))
        .pipe(replace("__VERSIONMAJOR__", gitVersionObj.Major))
        .pipe(replace("__VERSIONMINOR__", gitVersionObj.Minor))
        .pipe(replace("__VERSIONPATCH__", gitVersionObj.Patch))
        .pipe(gulp.dest('./_build/'));
});

gulp.task('copyFiles', () => {
    return gulp.src([
            './Task/**/*.*',
            './*.md',
            './*.jpg',
            './*.png'], {base:'./'})
        .pipe(gulp.dest('./_build/'));
 });

gulp.task('createPackage', shell.task([
    'tfx extension create --manifest-globs vss-extension.json'
], {cwd: "./_build/"}));

//gulp.task('publishbuild', gulpSequence('build', 'publishPackage'));
gulp.task('build', gulpSequence('clean', ['getVersion', 'copyFiles'], ['copyTokenizedFiles'], 'createPackage'));
gulp.task('default', ['build']);