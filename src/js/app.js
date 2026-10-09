document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
    navegacionFija();
    marcarEnlaceActivo();
});

const CANTIDAD_IMAGENES = 16;
let imagenActual = 1;


// ==============================
// GALERIA
// ==============================

function crearGaleria() {

    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {

        const imagen = document.createElement('IMG');

        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen Galeria';

        imagen.onclick = function() {
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);
    }
}


// ==============================
// MODAL
// ==============================

function mostrarImagen(i) {

    imagenActual = i;

    const imagen = document.createElement('IMG');

    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galeria';

    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Botón cerrar
    const cerrar = document.createElement('button');
    cerrar.classList.add('modal-cerrar');
    cerrar.innerHTML = '&times;';
    cerrar.onclick = cerrarModal;

    // Botón anterior
    const anterior = document.createElement('button');
    anterior.classList.add('modal-anterior');
    anterior.innerHTML = '&#10094;';

    anterior.onclick = function(e) {
        e.stopPropagation();
        imagenAnterior();
    };

    // Botón siguiente
    const siguiente = document.createElement('button');
    siguiente.classList.add('modal-siguiente');
    siguiente.innerHTML = '&#10095;';

    siguiente.onclick = function(e) {
        e.stopPropagation();
        imagenSiguiente();
    };

    modal.appendChild(cerrar);
    modal.appendChild(anterior);
    modal.appendChild(imagen);
    modal.appendChild(siguiente);

    const body = document.querySelector('body');
    body.appendChild(modal);
}


// ==============================
// CAMBIAR IMAGEN
// ==============================

function imagenAnterior() {

    imagenActual--;

    if (imagenActual < 1) {
        imagenActual = CANTIDAD_IMAGENES;
    }

    actualizarImagen();
}


function imagenSiguiente() {

    imagenActual++;

    if (imagenActual > CANTIDAD_IMAGENES) {
        imagenActual = 1;
    }

    actualizarImagen();
}


function actualizarImagen() {

    const imagen = document.querySelector('.modal img');

    if (imagen) {
        imagen.src = `src/img/gallery/full/${imagenActual}.jpg`;
    }
}


// ==============================
// CERRAR MODAL
// ==============================

function cerrarModal() {

    const modal = document.querySelector('.modal');

    if (modal) {
        modal.remove();
    }
}


// ==============================
// TECLADO
// ==============================

document.addEventListener('keydown', function(event) {

    const modal = document.querySelector('.modal');

    if (!modal) {
        return;
    }

    // Flecha izquierda
    if (event.key === 'ArrowLeft') {
        imagenAnterior();
    }

    // Flecha derecha
    if (event.key === 'ArrowRight') {
        imagenSiguiente();
    }

    // ESC
    if (event.key === 'Escape') {
        cerrarModal();
    }

    // Backspace
    if (event.key === 'Backspace') {
        cerrarModal();
    }
});


// ==============================
// NAVEGACION SUAVE
// ==============================

function navegacionFija() {

    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(function(enlace) {

        enlace.addEventListener('click', function(event) {

            event.preventDefault();

            const seccion = document.querySelector(enlace.getAttribute('href'));

            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}


// ==============================
// ENLACE ACTIVO
// ==============================

function marcarEnlaceActivo() {

    const secciones = document.querySelectorAll('section[id]');
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    window.addEventListener('scroll', function() {

        let seccionActual = '';

        secciones.forEach(function(seccion) {

            const seccionTop = seccion.offsetTop;

            if (window.scrollY >= seccionTop - 200) {
                seccionActual = seccion.getAttribute('id');
            }
        });

        enlaces.forEach(function(enlace) {

            enlace.classList.remove('activo');

            if (enlace.getAttribute('href') === `#${seccionActual}`) {
                enlace.classList.add('activo');
            }
        });
    });
}