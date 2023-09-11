

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