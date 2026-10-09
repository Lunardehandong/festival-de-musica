import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

export function js() {
    return src('src/js/app.js')
        .pipe(dest('build/js'));
}

export function css() {
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css'), { sourcemaps: '.' });
}

export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
}

// Primero compila JS y CSS.
// Después se queda escuchando cambios de SCSS.
export default series(js, css, dev);