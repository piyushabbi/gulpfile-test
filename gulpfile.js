var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

gulp.task('default', function () {
    console.log('This is the default task.');
});
/* ----------------------------------------------------------------------- */

// Independent task1 lengthy task
gulp.task('indTask1', function () {
    // To run this type gulp indTask
    setTimeout(function () {
        console.log('Some independent task, that takes more time.');
    }, 3000);
});
// Independent task3 lengthy task, that has to run & complete before the next task can fire up. For this callback is required
gulp.task('indTask3', function (callback) {
    // To run this type gulp indTask
    setTimeout(function () {
        callback();
        console.log('Some independent task, that takes more time.');
    }, 3000);
});

// Another Independent task
gulp.task('indTask2', function () {
    // To run this type gulp indTask
    console.log('Some independent task');
});

// Another Independent task
gulp.task('indTask4', ['indTask3'], function () {
    // To run this type gulp indTask
    console.log('Some independent task');
});

/* ----------------------------------------------------------------------- */

// Dependent task. To run indTask before build Task, pass it as an array before function definition
gulp.task('build1', ['indTask2', 'indTask1'], function () {
    console.log('Dependent Tasks Running.');
});

// this will run indTask3 and wait for it to finish and then run indTask2
gulp.task('build2', ['indTask2', 'indTask3', 'indTask4'], function () {
    console.log('Running sequence of tasks in order');
});

/* ----------------------------------------------------------------------- */

//SASS to CSS
gulp.task('css', function () {
    console.log('Sass to CSS task');

    gulp.src('sass/*.scss')
        .pipe(sass({
            'outputStyle': 'compressed' // This object added to minify css. Else no need to add the object, just type in sass()
        }))
        .pipe(concat('common.css'))   //This will combine all the generated css files into 1 file called common.css
        .pipe(gulp.dest('css'));
});

/* ----------------------------------------------------------------------- */
