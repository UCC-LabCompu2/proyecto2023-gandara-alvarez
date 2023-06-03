/**
 * ...
 * @method ...
 * @param {...} ... - ...
 * @param {...} ... - ...
 */

/**
 * ...
 * @method dibujarCuadrado
 * Funcion que se encarga de crear el canvas ya cuadriculado , con sus
 * ejes principales
 */

var alturaMaxima
var velocidadFinal
var tiempo

let calculoFuncion = () => {
    let altura, velocidad_inicial, gravedad;
     altura = document.getElementById("altura").value;
     velocidad_inicial = document.getElementById("velocidad").value;
     gravedad = document.getElementById("gravedad").value;
    tiempo = (velocidad_inicial * (-1) )/gravedad;
    velocidadFinal = velocidad_inicial + (gravedad * tiempo);

    if (velocidad_inicial == 0) {
        alturaMaxima = altura;
    }
    else {
        alturaMaxima = (velocidad_inicial^2)/(2 * gravedad);
    }

    console.log(alturaMaxima, tiempo);
    graficar(altura, alturaMaxima);
    mostrarResultados(alturaMaxima, tiempo);
}

let graficar = (m, b) =>{
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");

    let d = 20;
    m = Number(m);
    b = Number(b);

    dibujarCuadriculado();

    context.beginPath();
    let Y = m

    let interval = setInterval(function () {
        let posY = canvas.width / 2 + Y * d;
        let x = (m * Y + b);
        let posX = canvas.height / 2 - x * d;

        context.lineTo(posY, posX);
        context.strokeStyle = "#FF0000";
        context.lineWidth = 1.5;
        context.stroke();

        Y++;

        if (Y > 20) {
            clearInterval(interval);
        }
    }, 10)

    context.closePath();
}

let mostrarResultados = (altura, tiempo) =>{
    document.getElementById("distancia").innerHTML = altura;
    document.getElementById("tiempo").innerHTML = tiempo;
}

function dibujarCuadriculado() {
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    context.fillStyle = 'white';
    let d = 20;
    let h = 15;
    context.fillRect(0,0,d , h);


    canvas.width = canvas.width;

    //Lineas Horizontales
    for (let i = d; i < canvas.height; i += d) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.lineWidth = 0.5;
        context.stroke();
        context.closePath();
    }

    //Lineas Verticales
    for (let i = d; i < canvas.width; i += d) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.lineWidth = 0.5;
        context.stroke();
        context.closePath();
    }

    //Eje X
    context.beginPath();
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();

    //Eje Y
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();

    //Numeros Eje X
    for (let i = d; i < canvas.width; i += d) {
        let num = (-canvas.width / 2 + i) / d;
        context.font = "10px Arial";

        if (num % 2 === 0 && num !== 0) {
            context.fillText(num, i, canvas.height / 2 + h);
        }
    }

    //Numeros Eje Y
    for (let i = d; i < canvas.height; i += d) {
        let num = (canvas.height / 2 - i) / d;
        context.font = "10px Arial";

        if (num % 2 === 0 && num !== 0) {
            context.fillText(num, canvas.width / 2 - h, i);
        }
    }

    //Nombre Ejes
    context.font = "15px Arial Bolder";
    context.fillText("X", canvas.width - h, canvas.height / 2 - h);
    context.fillText("Y", canvas.width / 2 + h, h);

}

