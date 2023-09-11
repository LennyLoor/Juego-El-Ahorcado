(() => {
    'use strict'
    var palabras = [
        'ALURA',
        'NIÑO',
        'MASCOTA',
        'PROGRAMA',
        'ORACLE',
        'YOUTUBE'
    ];

    var juego = null;
    var finalizado = false;

    var html = {
        imagen: document.getElementById('image-ahorcado'),
        adivinado: document.querySelector('.adivinado'),
        errado: document.querySelector('.errado_box'),
        ganado: document.querySelector('.ganado_box'),

        section_Iniciar: document.querySelector('.homeBtn'),
        section_InsertInfo: document.querySelector('.InsertInfo'),
        section_IniciarJuego: document.querySelector('.IniciarJuego'),
        mensaje_Informacion: document.querySelector('.ip_form_info'),
    }
    var form = {
        nuevaPalabra: document.querySelector('[data-nuevaPalabra]'),
    }

    var buttons = {
        iniciar: document.getElementById('btn-Inicar-Juego'), 
        cancelar: document.getElementById('cancelar'), 
        desistir: document.getElementById('desistir-Palabra'), 
        ingresarPalabra: document.getElementById('btn-Ingresar-Palabra'), 
        guardarPalabra: document.getElementById('Guardar-Palabra'), 
        nuevoJuego: document.getElementById('nuevo-juego'), 
    }

    var activEscribir = false;
    var letra;

    /* ------------------------------------------------------------
                    IMAGEN - PALABRA
     ----------------------------------------------------------- */

    function dibujar(juego) {
        var element_;
        element_ = html.imagen;

        var estado = juego.estado;
        if (estado != 0) {

            if (estado === 8) {
                estado = juego.previo;
            }
            element_.src = 'assets/images/ahorcado/ahorcado_' + estado + '.svg';

            /* letras adivinadas */
            var palabra = juego.palabra;
            var adivinado = juego.adivinado;
            element_ = html.adivinado;

            html.ganado.innerHTML = '';
            html.ganado.classList.remove('pd-1');

            element_.innerHTML = '';
            element_.classList.remove('pd-1');

            for (let letra of palabra) {
                let span_ = document.createElement('span');
                let txt_ = document.createTextNode('');
                if (adivinado.indexOf(letra) >= 0) {
                    txt_.nodeValue = letra;
                }
                span_.appendChild(txt_);
                element_.appendChild(span_);
            }

            /* letras erradas */
            const errado_ = juego.errado;
            element_ = html.errado;

            html.ganado.innerHTML = '';
            html.ganado.classList.remove('pd-1');

            element_.innerHTML = '';
            element_.classList.remove('pd-1');

            for (let letra of errado_) {
                element_.classList.add('pd-1');
                let span_ = document.createElement('span');
                let txt_ = document.createTextNode(letra);
                span_.appendChild(txt_);
                element_.appendChild(span_);
            }

        }
    };

    function adivinar(juego, letra) {

        var estado = juego.estado;

        if (estado === 0 || estado === 8) {
            return true
        }
        var adivinado = juego.adivinado;
        var errado = juego.errado;
        if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
            return
        }
        var palabra = juego.palabra;
        if (palabra.indexOf(letra) >= 0) {
            let ganado = true;
            for (let l of palabra) {
                if (adivinado.indexOf(l) < 0 && l != letra) {
                    ganado = false;
                    juego.previo = juego.estado;
                    break
                }
            }
            if (ganado) {
                juego.estado = 8;
            }
            adivinado.push(letra);
        } else {
            juego.estado--
            errado.push(letra)
        }
    }

    window.onkeypress = function (e) { 
        if (activEscribir) {
            letra = e.key;
            escribir();
        }
    }

    function escribir() {
        letra = letra.toUpperCase();
        if (/[^A-ZÑ]/.test(letra)) {
            return
        }
        adivinar(juego, letra);
        var estado = juego.estado;
        if (estado === 8 && !finalizado) {
            setTimeout(mensajeGanador, 500)
            activEscribir = false;
            finalizado = true;
        } else if (estado === 1 && !finalizado) {
            setTimeout(mensajePerdedor, 500)
            activEscribir = false;
            finalizado = true;
        };
        dibujar(juego);
    }
    
    function nuevoJuego() {
        var palabra = palabraAleatoria();
        juego = {};
        juego.palabra = palabra;
        juego.estado = 7;
        juego.adivinado = [];
        juego.errado = [];
        finalizado = false;
        activEscribir = true;
        dibujar(juego);
    } nuevoJuego();

    buttons.nuevoJuego.addEventListener('click', function () {
        nuevoJuego();
    }); 

    function palabraAleatoria() {
        var index = ~~(Math.random() * palabras.length);
        return palabras[index]
    }

    function mensajeGanador() {
        html.errado.innerHTML = '';
        html.errado.classList.remove('pd-1');
        html.ganado.classList.add('pd-1');
        html.ganado.innerHTML = 'Felicidades ¡Ganaste! <i class="fa-solid fa-check"></i>';
    }
    function mensajePerdedor() {
        html.errado.innerHTML = 'Lo siento, perdiste....  La palabra era: <b class="ah_palabra">' + juego.palabra + '<b>';
    }


    /* ------------------------------------------------------------
                        PANTALLAS
     ----------------------------------------------------------- */
 
     buttons.iniciar.addEventListener('click', function () {
        html.section_Iniciar.style.display = "none";
        html.section_IniciarJuego.style.display = "flex";
        nuevoJuego();
    }); 

    buttons.ingresarPalabra.addEventListener('click', function () {
        activEscribir = false;
        html.section_Iniciar.style.display = "none";
        html.section_InsertInfo.style.display = "flex";
        html.mensaje_Informacion.classList.remove('msm_error');
        html.mensaje_Informacion.innerHTML = '<i class="fa-solid fa-circle-info"></i>Máximo 8 Letras'
    });   

    form.nuevaPalabra.addEventListener('keyup', () => {
        if (form.nuevaPalabra.value != '') {
            html.mensaje_Informacion.classList.remove('msm_error');
            html.mensaje_Informacion.innerHTML = '<i class="fa-solid fa-circle-info"></i>Máximo 8 Letras'
        }
    });

    buttons.guardarPalabra.addEventListener('click', function () {  
        nuevoJuego();  

        const newWord = form.nuevaPalabra.value.toUpperCase();

        if (!palabras.includes(newWord) && form.nuevaPalabra.value != '') {

            html.mensaje_Informacion.classList.remove('msm_error');
            html.mensaje_Informacion.innerHTML = '<i class="fa-solid fa-circle-info"></i>Máximo 8 Letras';

            palabras.push(newWord);

            form.nuevaPalabra.value = '';
            html.section_InsertInfo.style.display = "none";
            html.section_IniciarJuego.style.display = "flex";

            activEscribir = true;
            html.ganado.innerHTML = '';
            html.ganado.classList.remove('pd-1');

        }
        else if (palabras.includes(newWord)) {
            html.mensaje_Informacion.classList.add('msm_error');
            html.mensaje_Informacion.innerHTML = '<i class="fa-solid fa-xmark"></i>Esta palabra ya existe,Intenta con otra.'
        }
        else if (form.nuevaPalabra.value === '') {
            html.mensaje_Informacion.classList.add('msm_error');
            html.mensaje_Informacion.innerHTML = '<i class="fa-solid fa-xmark"></i> El campo no puede estar vacio'
        }

    });  

    buttons.cancelar.addEventListener('click', function () {
        html.section_InsertInfo.style.display = "none";
        html.section_Iniciar.style.display = "flex";
    });  

    buttons.desistir.addEventListener('click', function () {
         /* Limpiar campos */
         const limpiarInfoAdivinado = document.querySelectorAll('.adivinado span');
         const limpiarInfoErrado_box = document.querySelectorAll('.errado_box span');
         limpiarInfoAdivinado.forEach((a) => {
             a.innerHTML = '';
         });
         limpiarInfoErrado_box.forEach((a) => {
             a.innerHTML = '';
         }); 
         html.errado.innerHTML = '';
         html.errado.classList.remove('pd-1');
         html.ganado.innerHTML = '';
         html.ganado.classList.remove('pd-1');
         html.imagen.src = 'assets/images/ahorcado/ahorcado_8.svg';
 
         /* Mostrar página */
         html.section_IniciarJuego.style.display = "none";
         html.section_Iniciar.style.display = "flex";
    });   

})();

