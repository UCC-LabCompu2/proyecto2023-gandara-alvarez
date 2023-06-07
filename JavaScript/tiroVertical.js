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


function graficarTiroVertical() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Obtener los valores de los parámetros ingresados por el usuario
    const fuerza = Number(document.getElementById("velocidad").value);
    const alturaInicial = Number(document.getElementById("altura").value);
    const gravedad = Number(document.getElementById("gravedad").value);

    // Constantes
    const escalaX = 10; // Factor de escala para la posición horizontal
    const escalaY = 10; // Factor de escala para la posición vertical

    // Cálculos
    const velocidadInicial = Math.sqrt((2 * fuerza) / gravedad); // Calcular la velocidad inicial
    const tiempoTotal = (2 * velocidadInicial * Math.sin(Math.PI / 2)) / gravedad; // Tiempo total de vuelo
    const alturaMaxima = (Math.pow(velocidadInicial, 2) / (2 * gravedad)) + alturaInicial; // Altura máxima alcanzada

    // Configuración del lienzo
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";

    // Dibujar ejes
    const origenX = canvasWidth / 2;
    const origenY = canvasHeight / 2;

    // Eje x
    ctx.beginPath();
    ctx.moveTo(0, origenY);
    ctx.lineTo(canvasWidth, origenY);
    ctx.stroke();

    // Eje y
    ctx.beginPath();
    ctx.moveTo(origenX, 0);
    ctx.lineTo(origenX, canvasHeight);
    ctx.stroke();

    // Dibujar trayectoria
    ctx.beginPath();
    ctx.moveTo(origenX, origenY - alturaInicial * escalaY);

    let t = 0;
    let x = origenX;
    let y = origenY - alturaInicial * escalaY;

    while (y <= origenY) {
        x = origenX + t * escalaX; // Posición horizontal
        y = origenY - ((velocidadInicial * t * Math.sin(Math.PI / 2)) - 0.5 * gravedad * Math.pow(t, 2) + alturaInicial) * escalaY; // Posición vertical

        ctx.lineTo(x, y);

        t += 0.1;
    }

    ctx.stroke();
    mostrarResultados(alturaMaxima, t);
}

function mostrarResultados(alturaMaxima, tiempo) {
    document.getElementById("distancia").textContent = alturaMaxima.toFixed(2);
    document.getElementById("tiempo").textContent = tiempo.toFixed(2);
}


