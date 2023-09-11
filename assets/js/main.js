(()=>{
    const juego = {
        palabra: "HOLA",
        estado: 5,
        adivinado: ['A','L'],
        errado: ['Z', 'W', 'Y']
    }; 

    const html = {
       imagen: document.getElementById('image-ahorcado'),
       adivinado: document.querySelector('.adivinado'),
       errado: document.querySelector('.errado_box'),
    }

    function dibujar(juego) {
        console.log(juego.estado);
        /* Actualizar la imagen */
        var element_;
        element_ = html.imagen;
        element_.src = 'assets/images/ahorcado/ahorcado_' + juego.estado + '.svg';

        /* creamos las letras adivinadas */
        const palabra_ = juego.palabra;
        const adivinado_ = juego.adivinado;
        element_ = html.adivinado;

        console.log(element_);
        for( let letra of palabra_){
            let span_ = document.createElement('span');
            let txt_ = document.createTextNode('');
            if(adivinado_.indexOf(letra) >= 0){
                txt_.nodeValue = letra;
            }
            span_.appendChild(txt_);
            element_.appendChild(span_);
        }
        /* creamos las letras erradas */
        const errado_ = juego.errado;
        element_ = html.errado;
        for(let letra of errado_){
            let span_ = document.createElement('span');
            let txt_ = document.createTextNode(letra);
            span_.appendChild(txt_);
            element_.appendChild(span_);
        }

    };
    dibujar(juego);
    
})(); 
const section_Iniciar = document.querySelector('.homeBtn');
const section_InsertInfo = document.querySelector('.InsertInfo');
const section_IniciarJuego = document.querySelector('.IniciarJuego');

function IniciarJuego(){
    alert('IniciarJuego');
    section_Iniciar.style.display = "none";
    section_IniciarJuego.style.display = "flex";
}

function IngresarPalabra(){
    alert('IngresarPalabra');
    section_Iniciar.style.display = "none";
    section_InsertInfo.style.display = "flex";

}

function guardarIP(){
    section_InsertInfo.style.display = "none";
    section_IniciarJuego.style.display = "flex";
    
}

function cancelarIP(){
    section_InsertInfo.style.display = "none";
    section_Iniciar.style.display = "flex";
}

function nuevoJuego(){
    
}
function desistirJuego(){
    section_IniciarJuego.style.display = "none";
    section_Iniciar.style.display = "flex";
}