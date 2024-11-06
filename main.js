//Inicializacion de variables
let tarjetaDestapadas = 0;
let tarejta1 = null
let tarjeta2 = null
let primerResultado = null
let segundoResultado = null
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivo = null;
let timerInicial = 30;

//Apuntando a docuemntos HTML
let mostarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//Funciones
function contarTiempo() {
   tiempoRegresivo = setInterval(()=> {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`
        if(timer ==0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    },1000)
}

function bloquearTarjetas() {
    for (let i = 0; i<=15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion principal
function destapar(id) {

    if(temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

tarjetaDestapadas++;
console.log(tarjetaDestapadas);

if(tarjetaDestapadas == 1){
    //Mostrar el primer numero 
    tarejta1 = document.getElementById(id);
    primerResultado = numeros[id]
    tarejta1.innerHTML = primerResultado;

    //Deshabilitar primer boton
    tarejta1.disabled = true;
}else if(tarjetaDestapadas == 2) {
    //Mostrar Segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;

    //Deshabilitar segundo boton
    tarjeta2.disabled = true;

    //Incrementar movimientos
    movimientos++;
    mostarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if(primerResultado == segundoResultado){
        //Encerar contador tarjetas destapadas
        tarjetaDestapadas = 0;

        //Aumentar aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

        if(aciertos == 8) {
            clearInterval(tiempoRegresivo);
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😧`
            mostrarTiempo = `Fantastico! Solo demoraste ${timerInicial - timer} Segundos`
            mostarMovimientos.innerHTML `Movimientos: ${movimientos} 😎`
        }

    }else {
        setTimeout(()=>{
            tarejta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ';
            tarejta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetaDestapadas = 0;
        },800)
    }
}
}
