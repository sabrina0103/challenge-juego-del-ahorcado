var btn_agregar_palabra = document.querySelector("#agregar-palabra");
btn_agregar_palabra.addEventListener("click", mostrar_agregar);


var panel_inicio = document.querySelector(".menu-inicio");
var panel_agregar = document.querySelector(".nueva-palabra");
var panel_iniciar_juego = document.querySelector(".iniciar-juego");
var btn_iniciar_juego = document.querySelector("#iniciar-juego");
btn_iniciar_juego.addEventListener("click", mostrar_juego);


var palabras = ['ALURA','AHORCADO','ORACLE', 'CSS','JAVASCRIPT'];
var canvas = document.getElementById('tablero');
var tablero = canvas.getContext('2d');
var letras = [];
var palabra_correcta = "";
var errores = 10;

    function mostrar_agregar(){
        panel_agregar.classList.remove("invisible");
        panel_inicio.classList.add("invisible");
        
    }
//#region PANEL NUEVA PALABRA
var btn_guardar = document.querySelector("#guardar");
btn_guardar.addEventListener("click", guardar_empezar);

var btn_cancelar = document.querySelector("#cancelar");
btn_cancelar.addEventListener("click", cancelar)

function cancelar(){
    panel_agregar.classList.add("invisible");
    panel_inicio.classList.remove("invisible");
}


function guardar_empezar(){
    var nuevaPalabra = document.querySelector("#nuevaPalabra").value;
    if(String(nuevaPalabra).trim() != ""){
        palabras.push(nuevaPalabra.toUpperCase());
        panel_iniciar_juego.classList.remove("invisible");
        panel_agregar.classList.add("invisible");

    }
    else{
        Swal.fire({
            title: "¡No Ingreso ninguna palabra!",
            confirmButtonText: "Aceptar",
        });
    }
    
}
//#endregion

   

//#region PANEL JUGAR0'ik9okkkkkkkkk0kkkkkkkkkg,onfb8p
function mostrar_juego(){
    panel_iniciar_juego.classList.remove("invisible");
    panel_inicio.classList.add("invisible");
    
}
function regresar_menu(){
    panel_inicio.classList.remove("invisible");
    panel_iniciar_juego.classList.add("invisible");
    
    
}



function escojer_palabra_secreta(){
    var palabra = palabras[Math.floor(Math.random()*palabras.length)];
    palabra_secreta = palabra;
    console.log(palabra);
    return palabra_secreta;
} 

//DIBUJA LAS LINEAS DONDE VAN LAS PALABRAS
function dibujar_lineas(){
    tablero.lineWidth = 6;
    tablero.lenecap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#0A3871";
    tablero.beginPath();
    var ancho = 600/palabra_secreta.length;
    var desplazamiento = 500;
    var l_linea = 50;
    if(window.screen.width<=383)
    {
        desplazamiento= 350;
        l_linea = 30;
    }
    for(let i=0; i<palabra_secreta.length; i++){
   
        tablero.moveTo(desplazamiento+(ancho*i),640);
        tablero.lineTo(desplazamiento+l_linea+(ancho*i),640);

    }

    tablero.stroke();
    tablero.closePath();

}
    dibujar_lineas(escojer_palabra_secreta());


function escribir_letra_correcta(index){
    tablero.font = 'bold  52px MV Boli';
    tablero.lineWidth = 6;
    tablero.lenecap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#0A3871";
    var despl= 505;
    var ancho = 600/palabra_secreta.length;
    if(window.screen.width<=383){
        despl = 350;
    }

    tablero.fillText(palabra_secreta[index],despl+(ancho*index),620);
    
}

function escribir_letra_incorrecta(letra, errorLeft){
    tablero.font = 'bold  40px MV Boli';
    tablero.lineWidth = 6;
    tablero.lenecap = "round";
    tablero.lineJoin = "round";
    tablero.strokeStyle = "#0A3871";

    tablero.fillText(letra, 535+(40*(10-errorLeft)),710,40)

}
function verificar_letra_presionada(key){

    var ascii = key.charCodeAt(0);
    if(ascii<97 || ascii>122){
        Swal.fire({
            title: "¡Solo letras en minúscula!",
            confirmButtonText: "Aceptar",
        });
        
        return false;
    }
    if(letras.length<1 || letras.indexOf(key)<0){
        letras.push(key);
        return true;
    }
    else{
        Swal.fire({
            title: "Ya intentaste con esa letra. Proba con otra",
            confirmButtonText: "Aceptar",
        });
        
        return false;
    }
}
function adicionar_letra_correcta(i){

    palabra_correcta += palabra_secreta[i].toUpperCase();
}
function restar_intentos(){
        errores -= 1;

} 
var tot_adivinado = 0;
document.onkeydown = (e) => {
    if(document.querySelector(".iniciar-juego").classList.contains("invisible")){
        return;
    }
    if(errores>0){
    let letra = e.key.toUpperCase();
    if(verificar_letra_presionada(e.key)){
        if(palabra_secreta.includes(letra)){
        
            adicionar_letra_correcta(palabra_secreta.indexOf(letra))
            for(let i=0; i<palabra_secreta.length; i++){
                if(palabra_secreta[i]==letra){
                    escribir_letra_correcta(i);
                    tot_adivinado++;
                }
            }
            if(palabra_secreta.length == tot_adivinado){
                               
            Swal.fire({
                title: "¡GANASTE FELICIDADES! :)",
               
                icon: 'warning',
                confirmButtonText: "Aceptar",
                customClass:{ popup:'my_swal'}
            }).then(resultado => {
                if (resultado.value) {
                    nuevo_juego();
                }
            });;
            }
        }
        else{
           
            restar_intentos();
            dibujar_horca_monigote();
            escribir_letra_incorrecta(letra,errores);

                

               
            
        }
    }
}
};
//#endregion


//#region PANEL NUEVO JUEGO
var btn_nuevo_juego = document.querySelector("#nuevo-juego");
btn_nuevo_juego.addEventListener("click", nuevo_juego);
function nuevo_juego(){
    tablero.clearRect(0, 0, canvas.width, canvas.height);
    dibujar_lineas(escojer_palabra_secreta());
    errores = 9;
    letras = [];
    var palabra_correcta = "";
    tot_adivinado = 0;
    //resetear horca y moñeco
    

}
//#endregion

//#region DESISTIR
var btn_desistir = document.querySelector("#desistir");
btn_desistir.addEventListener("click",desistir);

function desistir(){
    Swal
    .fire({
        title: "¿Estás seguro de darte por vencido?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            Swal.fire({
                title: "La palabra era " + palabra_secreta + ". Te quedaban  "+ errores + " intentos.",
                confirmButtonText: "Aceptar",
            });
           nuevo_juego();
           regresar_menu();
        }
    });
    
}

//endregion
//creando horca y muñeco
  
function dibujar_horca_monigote(){
    //consultar cuantos errores van quedando
    miLienzo = document.getElementById("tablero");
    lapiz = miLienzo.getContext("2d");
    lapiz.beginPath();
    switch (errores) {
        case 9:
            lapiz.moveTo(550,503);
            lapiz.lineTo(844,503);
            lapiz.strokeStyle="red";
            lapiz.stroke();
            break;
        
        case 8:
            lapiz.moveTo(620,503);
            lapiz.lineTo(620,133);
            lapiz.strokeStyle="red";
            lapiz.stroke();
            break;
            
        case 7:
            //              X Y
            lapiz.moveTo(620,133);
            lapiz.lineTo(760,133);
            lapiz.strokeStyle="red";
            lapiz.stroke();
            break;
         case 6:
            //              X Y
            lapiz.moveTo(760,133);
            lapiz.lineTo(760,200);
            lapiz.strokeStyle="red";
            lapiz.stroke();
            break;
        case 5:
            //              X Y
            
            lapiz.strokeStyle = 'red';
            lapiz.lineWidth = 4;
            
            lapiz.arc(760, 228, 30, 0, 2 * Math.PI, false);
            lapiz.stroke(); 
            break;

        case 4:
                //              X Y
            lapiz.moveTo(760,260);
            lapiz.lineTo(760,390);
            lapiz.strokeStyle="red";
            lapiz.stroke();
            break;

         case 3:
                //   brazo iz          X Y
            lapiz.moveTo(760,260);
            lapiz.lineTo(690,320);
            lapiz.strokeStyle="red";
            lapiz.stroke();
            break;

        case 2:
                //    brazo der          X Y
            lapiz.moveTo(760,260);
            lapiz.lineTo(830,320);
            lapiz.strokeStyle="red";
            lapiz.stroke();
            break;  

        case 1:
                //  pierna iz            X Y
            lapiz.moveTo(760,390);
            lapiz.lineTo(690,450);
            lapiz.strokeStyle="red";
            lapiz.stroke();
            break; 
        case 0:
                //  pierna der          X Y
            lapiz.moveTo(760,390);
            lapiz.lineTo(830,450);
            lapiz.strokeStyle="red";
            lapiz.stroke();   
            Swal.fire({
                width:300,
                title: "¡No hay más intentos!",
                text: "La palabra era: " + palabra_secreta,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                customClass:{ popup:'my_swal'}
            });break; 
            
      }
    
}


